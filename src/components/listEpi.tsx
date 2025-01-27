'use client';
import React from 'react';
import { Button } from './ui/button';
import { usePlayerStore } from '@/app/store/playerStore';
import { useRouter } from 'next/navigation';

const ListEpi = ({ movies }: { movies: IMovie }) => {
  // console.log(movies);
  // const pathname = usePathname();
  const router = useRouter();
  const {
    // activeServer,
    // activeEpisodeIndex,
    // currentEpisodeUrl,
    // sub,
    // setActiveServer,
    setPath,
    setActiveEpisodeIndex,
    setCurrentEpisodeUrl,
    // setSub,
  } = usePlayerStore();
  return (
    <>
      <div
        className={movies?.episodes[0].server_name.length > 4 ? `grid gap-2 w-full` : 'grid gap-2 w-[50vw] md:w-[20vw] '}
        style={{
          gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))',
        }}
      >
        {movies?.episodes[0]?.items.length > 1 &&
          movies?.episodes[0]?.items.map((item2, index2) => (
            <Button
              key={index2}
              onClick={() => {
                const episodeNumber = item2.slug.includes('tap-') ? item2.slug.replace('tap-', '') : item2.slug;
                // setSub(item2?.sub);
                setCurrentEpisodeUrl(item2?.embed);
                setActiveEpisodeIndex(index2);
                setPath(`/xem-phim/${movies.slug}`);
                router.push(`/xem-phim/${movies.slug}?tap=${episodeNumber}`);
              }}
              className={`bg-2 text-white rounded-xl min-h-11 hover:text-secondary`}
            >
              {item2.name}
            </Button>
          ))}
      </div>
      {/* </div>
      ))} */}
    </>
  );
};

export default ListEpi;
