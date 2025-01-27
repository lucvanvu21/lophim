'use client';
import { useEffect, useRef, useState } from 'react';
import ImageCard from './imageCard';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const ListMovies = ({ 
  data, 
  paginate,
  cate1,
  slug,
  keyword
}: { 
  data: IMovie[];
  paginate: {
    current_page: number;
    total_page: number;
    total_items: number;
    items_per_page: number;
  };
  cate1: string;
  slug: string;
  keyword?: string;
}) => {
  const [movies, setMovies] = useState(data);
  const [currentPage, setCurrentPage] = useState(paginate.current_page);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(currentPage < paginate.total_page);
  const observerRef = useRef<IntersectionObserver>();
  const loadingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      async (entries) => {
        const target = entries[0];
        if (target.isIntersecting && hasMore && !loading) {
          setLoading(true);
          try {
            const nextPage = currentPage + 1;
            const response = await fetch(`/api/movies?cate1=${cate1}&slug=${slug}&page=${nextPage}&keyword=${keyword || ''}`);
            const newData = await response.json();
            
            if (newData.status === 'success') {
              setMovies(prev => [...prev, ...newData.items]);
              setCurrentPage(nextPage);
              setHasMore(nextPage < newData.paginate.total_page);
            }
          } catch (error) {
            console.error('Error loading more movies:', error);
          }
          setLoading(false);
        }
      },
      { threshold: 0.1 }
    );

    if (loadingRef.current) {
      observer.observe(loadingRef.current);
    }

    observerRef.current = observer;

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [currentPage, hasMore, loading, cate1, slug, keyword]);

  const x = paginate.items_per_page > 15 ? 'xl:grid-cols-8' : 'xl:grid-cols-6';

  return (
    <>
      <div className={cn('grid grid-rows-2 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6', x)}>
        {Array.isArray(movies) && movies.map((item, index) => (
          <div className="shadow" key={`${item.id}-${index}`}>
            <Link href={'/phim/' + item?.slug}>
              <div className="relative pb-[143%] group overflow-hidden rounded-lg">
                <ImageCard movies={item} index={index} />
                <div className="absolute top-0 right-0 z-20 bg-[#27a35b] font-semibold pt-1 px-2 text-center text-sm rounded-bl-[4px]">
                  {item?.current_episode}
                </div>
              </div>
              <div className="mt-1">
                <h2 className="text-md line-clamp-1 hover:text-primary">{item.name}</h2>
                <h2 className="text-md text-gray-500 line-clamp-1 hover:text-primary">{item.original_name}</h2>
              </div>
            </Link>
          </div>
        ))}
      </div>
      
      <div ref={loadingRef} className="py-4 text-center">
        {loading ? (
          <div className="flex justify-center">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : hasMore ? (
          <div className="h-10" /> 
        ) : (
          <p className="text-gray-500">Đã hiển thị tất cả phim</p>
        )}
      </div>
    </>
  );
};

export default ListMovies;