'use client';
import React, { useEffect } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';

import Image from 'next/image';
import { Star } from 'lucide-react';

const DetailSeason = ({ tmdbId, season }: { tmdbId: string; season: string }) => {
  const [detail, setDetail] = React.useState(null);

  useEffect(() => {
    const getSeason = async () => {
      const res = await fetch(`https://api.themoviedb.org/3/tv/${tmdbId}/season/${season}?language=en-US`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
        },
      });
      const detail = await res.json();
      // console.log('detail', detail);
      setDetail(detail);
    };
    getSeason();
  }, [tmdbId, season]);

  return (
    <div>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1 ">
          <AccordionTrigger>
            <div className="flex items-start gap-4">
              {/* Poster nhỏ */}
              <div className="flex-shrink-0 w-20 h-28 relative">
                <Image
                  src={
                    detail?.poster_path ? `https://image.tmdb.org/t/p/w154${detail?.poster_path}` : '/placeholder.png' // Thay thế bằng ảnh mặc định nếu không có poster
                  }
                  alt={detail?.name || 'Season Poster'}
                  loading="lazy"
                  placeholder="blur"
                  blurDataURL="data:image/svg+xml;base64,..."
                  className="rounded-md"
                  quality={50}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>

              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white mb-2">Phần {detail?.season_number || 'Season Details'}</h3>
                <p className="text-sm text-gray-400 mb-1">Phát hành: {detail?.air_date || 'N/A'}</p>
                <p className="text-sm text-gray-400">Số tập: {detail?.episodes?.length || 'N/A'}</p>
                <p className="text-sm flex text-yellow-400 items-center">
                  {detail?.vote_average || 'N/A'} <Star className="text-yellow-400 ml-2 size-4" />
                </p>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {detail?.episodes?.map(episode => (
                <div key={episode.id} className="flex items-start gap-4 bg-[#282b3a] p-4 rounded-2xl">
                  {/* Episode Thumbnail */}
                  <div className="flex-shrink-0 w-24 h-16 relative">
                    <Image
                      src={
                        episode?.still_path ? `https://image.tmdb.org/t/p/w154${episode?.still_path}` : '/placeholder.png' // Placeholder image if no still path
                      }
                      alt={episode?.name || 'Episode Thumbnail'}
                      loading="lazy"
                      className="rounded-md"
                      quality={50}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  </div>

                  {/* Episode Details */}
                  <div className="flex-1">
                    <h4 className="text-md font-semibold text-white mb-1">
                      Tập {episode?.episode_number} : {episode?.name || 'Episode Title'}
                    </h4>
                    <p className="text-sm text-gray-400 mb-1">{episode?.air_date || 'N/A'}</p>
                    <p className="text-sm text-gray-300 line-clamp-2">Điểm đánh giá: {episode?.vote_average || 'N/A'}</p>
                  </div>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default DetailSeason;
