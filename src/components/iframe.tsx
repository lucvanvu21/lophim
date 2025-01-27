'use client';
import { useEffect, useState } from 'react';
import JWPlayer from '@jwplayer/jwplayer-react';
import { Button } from './ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { usePlayerStore } from '@/app/store/playerStore';
import { usePathname, useRouter } from 'next/navigation';
import { AspectRatio } from '@radix-ui/react-aspect-ratio';

const Iframe = ({ movie }: { movie: IMovie }) => {
  // console.log('movie--1', movie);
  const pathname = usePathname();
  // console.log('pathname', pathname);
  const router = useRouter();
  const isMobile = useIsMobile();
  const [loading, setLoading] = useState(true);
  // const [sub, setSub] = useState(movie?.episodes[0]?.serverData[0]?.sub);
  // const [currentEpisodeUrl, setCurrentEpisodeUrl] = useState(movie?.episodes[0]?.serverData[0]?.link);
  // const [activeEpisodeIndex, setActiveEpisodeIndex] = useState<number | null>(0);
  // const [activeServer, setActiveServer] = useState<number | null>(0);
  const {
    activeServer,
    activeEpisodeIndex,
    currentEpisodeUrl,
    sub,
    path,
    setActiveServer,
    setActiveEpisodeIndex,
    setCurrentEpisodeUrl,
    // setSub,
    setPath,
  } = usePlayerStore();

  const playerWidth = isMobile ? '100%' : '100vw';
  const playerHeight = isMobile ? '100%' : '85vh';

  useEffect(() => {
    // console.log('pathname', pathname, path);
    if (pathname !== path) {
      if (movie?.episodes[0]?.items?.length > 0) {
        // setSub(movie.episodes[0].serverData[0].sub);
        setCurrentEpisodeUrl(movie?.episodes[0]?.items[0].embed);
        setActiveEpisodeIndex(0);
      }
      setPath(pathname);
    }
    if (movie?.episodes[0]?.items[0] && currentEpisodeUrl === null) {
      // setSub(movie.episodes[0].serverData[0].sub);
      setCurrentEpisodeUrl(movie?.episodes[0]?.items[0]?.embed);
      setActiveEpisodeIndex(0);
    }
  }, [movie, setCurrentEpisodeUrl]);
  const playlist = [
    {
      file: currentEpisodeUrl,
      title: movie?.name,
      image: `${process.env.NEXT_PUBLIC_THUMB}${movie?.poster_url}`,
      tracks: [
        {
          file: sub || 'sub',
          label: 'Vietnamese',
          kind: 'captions',
          default: true,
        },
      ],
    },
  ];
  // console.log('playlist', isMobile, currentEpisodeUrl);
  return (
    <>
      <div>
        {loading && <div className="min-h-[60vh] text-center">Loading...</div>}
        {/* {JSON.stringify(currentEpisodeUrl)} */}
        {(currentEpisodeUrl && currentEpisodeUrl?.includes('?url=')) || currentEpisodeUrl?.includes('?hash=') ? (
          <AspectRatio ratio={22 / 9} className=" w-full">
            <iframe
              key={currentEpisodeUrl}
              src={currentEpisodeUrl.startsWith('https') ? currentEpisodeUrl : `https://example.com/${currentEpisodeUrl}`}
              allowFullScreen
              onLoad={() => setLoading(false)}
              className="w-full h-full"
              // style={{ border: 'none', height: '100%', width: '100%' }}
            ></iframe>
          </AspectRatio>
        ) : (
          <JWPlayer
            key={currentEpisodeUrl}
            library="https://cdn.jwplayer.com/libraries/1pOrUWNs.js"
            playlist={playlist}
            onReady={() => setLoading(false)}
            onError={() => setLoading(false)}
            onLoad={() => setLoading(false)}
            config={{
              pipIcon: 'enabled',
              playbackRateControls: true,
              displaydescription: true,
              displaytitle: true,
              // skin: {
              //   name: 'myskin',
              // },
              timeSlider: {
                legacy: true,
              },
              width: playerWidth,
              height: playerHeight,
            }}
          />
        )}
      </div>
      <div className="flex flex-col justify-start items-start gap-4 mt-2 container mx-auto px-2">
        <div className="flex gap-2">
          {movie?.episodes.length > 1 &&
            movie?.episodes.map((item, index) => (
              <Button
                variant="outline"
                key={index}
                onClick={() => {
                  setActiveServer(index);
                  setCurrentEpisodeUrl(item?.items[0]?.embed);
                  setActiveEpisodeIndex(0);
                }}
                className={`${activeServer === index ? 'border-primary text-primary' : ' text-white'} rounded-xl`}
              >
                {item?.server_name}
              </Button>
            ))}
        </div>
        {movie?.total_episodes > 1 &&
          movie?.episodes.map((item, index) => (
            <>
              {activeServer === index && (
                <div
                  className="grid gap-2 w-full"
                  style={{
                    gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
                  }}
                >
                  {item?.items.map((item2, index2) => {
                    const episodeNumber = item2.slug.includes('tap-') ? item2.slug.replace('tap-', '') : item2.slug;
                    return (
                      <Button
                        key={item2.slug}
                        onClick={() => {
                          // setSub(item2?.sub);

                          setCurrentEpisodeUrl(item2?.embed);
                          router.push(`/xem-phim/${movie?.slug}?tap=${episodeNumber}`);
                          setActiveEpisodeIndex(index2);
                        }}
                        className={`${
                          activeEpisodeIndex === index2 ? 'bg-primary' : 'bg-2 text-white'
                        } rounded-xl min-h-11 hover:text-secondary`}
                      >
                        {item2.name}
                      </Button>
                    );
                  })}
                </div>
              )}
            </>
          ))}

        {movie?.total_episodes < 2 &&
          movie?.episodes.map((item, index) => (
            <>
              {activeServer === index && (
                <div
                 className='flex gap-3 justify-center items-center'
                >
                  {item?.items.length > 1 &&
                    item?.items.map((item2, index2) => {
                      // const episodeNumber = item2.slug.includes('tap-') ? item2.slug.replace('tap-', '') : item2.slug;
                      return (
                        <Button
                          key={item2.slug}
                          onClick={() => {
                            // setSub(item2?.sub);

                            setCurrentEpisodeUrl(item2?.embed);
                            // router.push(`/xem-phim/${movie?.movie?.kkslug}?=$`);
                            setActiveEpisodeIndex(index2);
                          }}
                          className={`${
                            activeEpisodeIndex === index2 ? 'bg-primary' : 'bg-2 text-white'
                          } rounded-xl min-h-11 hover:text-secondary`}
                        >
                          {item2.name}
                        </Button>
                      );
                    })}
                </div>
              )}
            </>
          ))}
      </div>
    </>
  );
};

export default Iframe;
