'use client';
import React, { useCallback, useState, useRef, useEffect } from 'react';
import { Input } from '../ui/input';
import { Loader2, Search, X } from 'lucide-react';
import { ScrollArea } from '../ui/scroll-area';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';
import debounce from 'lodash/debounce';
import Image from 'next/image';
import { moviesServer } from '@/requestApi/movies/moviesServer';
import { useLoadingStore } from '@/app/store/loadingStore';

const SearchX = () => {
  const router = useRouter();
  const { setLoading, globalLoading } = useLoadingStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const searchContainerRef = useRef(null);
  // console.log('isLoading', globalLoading);

  const debouncedSearch = useCallback(
    debounce(async query => {
      if (query.trim().length > 0) {
        setIsLoading(true);
        const results = await searchMovies(query);
        setSearchResults(results);
        setShowResults(true);
        setIsLoading(false);
      } else {
        setSearchResults([]);
        setShowResults(false);
      }
    }, 500),
    []
  );

  const searchMovies = async query => {
    try {
      if (query.length > 0) {
        const res = await moviesServer.getMoviesByType<IModelPaginate<IMovie>>('search', undefined, 1, 10, query);
        if (res.error) {
          return [];
        }
        return res.items;
      }
    } catch (error) {
      return [];
    }
  };

  const handleSearch = e => {
    e.preventDefault();
    if (searchQuery.trim().length > 0) {
      router.push(`/search?keyword=${encodeURIComponent(searchQuery.trim())}`);
      setShowResults(false);
    }
  };

  const handleInputChange = e => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.length === 0) {
      setShowResults(false);
    } else {
      debouncedSearch(query);
    }
  };

  const handleClickOutside = e => {
    if (searchContainerRef.current && !searchContainerRef.current.contains(e.target)) {
      setShowResults(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  const handleMovieClick = async movieSlug => {
    setLoading(true); // Hiển thị loading
    await router.push(`/phim/${movieSlug}`); // Chuyển hướng
    // setLoading(false); // Tắt loading
  
    setShowResults(false); // Ẩn kết quả tìm kiếm
    setSearchQuery(''); // Xóa nội dung tìm kiếm
  };
  // console.log('searchQuery:---->', showResults);
  return (
    <div ref={searchContainerRef} className="relative w-full lg:min-w-[300px]">
      <form onSubmit={handleSearch} className="flex items-center">
        <div className="relative w-full">
          <Input placeholder="Tìm kiếm phim..." value={searchQuery} onChange={handleInputChange} className="w-full pl-9" />
          {isLoading && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <Loader2 className="h-4 w-4 animate-spin" />
            </div>
          )}
          {searchQuery && !isLoading && (
            <div
              onClick={() => {
                setSearchQuery('');
                setShowResults(false);
              }}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 hover:bg-inherit hover:text-primary cursor-pointer"
            >
              <X className="h-4 w-4" />
            </div>
          )}
          <Button
            type="submit"
            variant="ghost"
            size="icon"
            aria-label="search"
            className="absolute left-1 top-1/2 transform -translate-y-1/2 hover:bg-inherit hover:text-primary "
          >
            <Search className="h-4 w-4" />
          </Button>
        </div>
      </form>
      {showResults && !globalLoading && (
        <div className="absolute top-full mt-1 w-full bg-background border rounded-md shadow-lg z-50">
          <ScrollArea className="h-[400px]">
            {searchResults.length > 0 ? (
              searchResults.map((movie: IMovie) => (
                <div
                  key={movie.id}
                  // href={`/phim/${movie.slug}`}
                  onClick={() => handleMovieClick(movie.slug)}
                  className="grid grid-cols-[minmax(48px,1fr),minmax(80px,4fr)] p-2 hover:bg-accent cursor-pointer"
                >
                  <div className="w-12 h-16 relative mr-2">
                    <Image src={movie.thumb_url || '/placeholder.jpg'} alt={movie.name} fill className="object-cover rounded" />
                  </div>
                  <div>
                    <h4 className="font-medium line-clamp-1 text-sm">{movie.name}</h4>
                    <h4 className="font-medium line-clamp-1 text-sm text-muted-foreground">{movie.original_name}</h4>
                    <p className="text-sm text-muted-foreground">{movie.current_episode}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-4 text-sm text-muted-foreground">Không tìm thấy kết quả</div>
            )}
          </ScrollArea>
        </div>
      )}
    </div>
  );
};

export default SearchX;
