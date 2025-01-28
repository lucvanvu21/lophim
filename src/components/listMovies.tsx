import ImageCard from './imageCard';
import Link from 'next/link';
import { PaginationPage } from './pagination';
import { cn } from '@/lib/utils';

const ListMovies = ({ data, paginate }: { data: IMovie[]; paginate?: IPaginate }) => {
  // console.log('data', data);
  const x = paginate?.items_per_page > 15 ? 'xl:grid-cols-8' : 'xl:grid-cols-6';
  return (
    <>
      <div className={cn('grid grid-rows-2 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6  gap-6', x)}>
        {Array.isArray(data) &&
          data.map((item, index) => {
            return (
              <div className=" shadow " key={item.id}>
                <Link href={'/phim/' + item?.slug}>
                  <div className="relative pb-[143%] group overflow-hidden rounded-lg ">
                    <ImageCard movies={item} index={index} />
                    <div className="absolute top-0 right-0 z-20 bg-[#27a35b] font-semibold pt-1 px-2 text-center text-sm rounded-bl-[4px]">
                      {item?.current_episode}
                    </div>
                  </div>
                  <div className="mt-1">
                    <h3 className="text-md line-clamp-1 hover:text-primary">{item.name}</h3>
                    <h3 className="text-md text-gray-400 line-clamp-1 hover:text-primary">{item.original_name}</h3>
                    {/* <p className="text-sm text-gray-500">{item.year}</p> */}
                  </div>
                </Link>
              </div>
            );
          })}
      </div>
      {paginate?.total_page > 1 && (
        <div className="my-7 pt-4 z-1 border-t">
          <PaginationPage totalPage={paginate?.total_page} currentPage={paginate?.current_page} />
        </div>
      )}
    </>
  );
};

export default ListMovies;
