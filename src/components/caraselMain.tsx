'use client';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { Box, Button, IconButton, Skeleton, Typography } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Image from 'next/image';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

import Link from 'next/link';


const CaraselMain = ({ data }: { data: any }) => {
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    skipSnaps: false,
    dragFree: true,
    containScroll: 'trimSnaps',
    loop: true,
    // breakpoints: {
    //   '(min-width: 1024px)': { slidesToScroll: 6 },
    //   '(min-width: 768px)': { slidesToScroll: 4 },
    //   '(min-width: 630px)': { slidesToScroll: 3 },
    //   '(max-width: 629px)': { slidesToScroll: 2 },
    // },
  });
  const autoplayInterval = useRef<NodeJS.Timeout | null>(null);

  const onSelect = useCallback(api => {
    setCanScrollPrev(api.canScrollPrev());
    setCanScrollNext(api.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect(emblaApi);
    emblaApi.on('select', () => onSelect(emblaApi));
    emblaApi.on('reInit', () => onSelect(emblaApi));
    const autoplay = () => {
      if (emblaApi) emblaApi.scrollNext();
    };

    autoplayInterval.current = setInterval(autoplay, 5000);

    return () => {
      if (autoplayInterval.current) clearInterval(autoplayInterval.current);
    };

    // setMounted(true);
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <>
      <Box sx={{ position: 'relative', width: '100%' }}>
        <Box ref={emblaRef} sx={{ overflow: 'hidden' }}>
          <Box sx={{ display: 'flex', gap: 2 }}>
            {data?.map((item: any) => {
              return (
                <Box
                  key={item._id}
                  sx={{
                    flexShrink: 0,
                    width: '100%',
                    position: 'relative',
                  }}
                >
                  <Box
                    sx={{ minWidth: '100%', maxHeight: { xs: '236px', sm: '330px', md: '430px', lg: '500px' } }}
                    key={item._id}
                  >
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        background: 'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.3) 40%, rgba(0,0,0,1) 100%)',
                        zIndex: 1,
                      }}
                    />
                    <Box
                      sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '6%',
                        right: '6%',
                        display: { xs: 'none', sm: 'none', md: 'block' },
                        zIndex: 2,
                      }}
                    >
                      <Typography sx={{ display: { xs: 'none', sm: 'block' } }} variant="h3" fontWeight={700}>
                        {item.name}
                      </Typography>
                      <Typography
                        sx={{
                          display: '-webkit-box',
                          overflow: 'hidden',
                          WebkitBoxOrient: 'vertical',
                          WebkitLineClamp: 2,
                          textOverflow: 'ellipsis',
                          marginY: '0.5rem',
                        }}
                      >
                        {item?.tmdb?.vote_average} 
                      </Typography>

                      <Box>
                        <Button
                          variant="contained"
                          // color="error"
                          sx={{
                            marginY: '0.5rem',
                            padding: '0',
                            background: 'linear-gradient(to right, #fc000c 0, #f9444d 100%)',
                            '&:hover': {
                              background: 'linear-gradient(to right, rgba(252, 0, 12, 0.8) 0%, rgba(249, 68, 77, 0.8) 100%)',
                            },
                          }}
                        >
                          <Link
                            href={`/chi-tiet-phim/` + item.slug}
                            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '0.5rem 1rem' }}
                          >
                            <Typography>Xem Ngay</Typography>
                            <PlayArrowIcon />
                          </Link>
                        </Button>
                      </Box>
                    </Box>
                    <Box
                      sx={{
                        position: 'absolute',
                        zIndex: 2,
                        bottom: '5%',
                        right: '5%',
                        display: { xs: 'block', sm: 'block', md: 'none' },
                      }}
                    >
                      <Button
                        variant="contained"
                        sx={{
                          padding: '0',
                          background: 'linear-gradient(to right, #fc000c 0, #f9444d 100%)',
                          '&:hover': {
                            background: 'linear-gradient(to right, rgba(252, 0, 12, 0.8) 0%, rgba(249, 68, 77, 0.8) 100%)',
                          },
                        }}
                        // sx={{  padding: '0.5rem 1rem' }}
                      >
                        <Link
                          href={`/chi-tiet-phim/` + item.slug}
                          style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '0.2rem' }}
                        >
                          <Typography>Xem Ngay</Typography> <PlayArrowIcon />
                        </Link>
                      </Button>
                    </Box>
                    <Image
                      // srcSet={}
                      // loader={imageLoader}
                      src={item?.thumbUrl?.startsWith('https') ? `${item.thumb_url}` : `https://img.ophim.live/uploads/movies/${item.thumbUrl}`}
                      alt={item.name}
                      quality={60}
                      placeholder="blur"
                      blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMAAAADA..."
                      loading="lazy"
                      sizes="(max-width: 768px) 50vw, (max-width: 1024px) 80vw, 70vw"
                      style={{
                        width: '100%',
                        height: 'auto',
                        objectFit: 'cover',
                        // maxWidth: '100%',
                        maxHeight: '500px',
                      }}
                      width={900}
                      height={800}
                      // unoptimized
                      // layout="responsive"
                    />
                  </Box>
                </Box>
              );
            })}
          </Box>
        </Box>

        {/* Navigation Buttons */}
        <IconButton
          onClick={scrollPrev}
          disabled={!canScrollPrev}
          sx={{
            position: 'absolute',
            left: 0,
            top: '50%',
            transform: 'translateY(-50%)',
            bgcolor: 'rgba(0,0,0,0.5)',
            color: 'white',
            '&:hover': {
              bgcolor: 'rgba(0,0,0,0.7)',
            },
            '&.Mui-disabled': {
              opacity: 0.5,
              color: 'white',
            },
          }}
        >
          <ChevronLeftIcon />
        </IconButton>

        <IconButton
          onClick={scrollNext}
          disabled={!canScrollNext}
          sx={{
            position: 'absolute',
            right: 0,
            top: '50%',
            transform: 'translateY(-50%)',
            bgcolor: 'rgba(0,0,0,0.5)',
            color: 'white',
            '&:hover': {
              bgcolor: 'rgba(0,0,0,0.7)',
            },
            '&.Mui-disabled': {
              opacity: 0.5,
              color: 'white',
            },
          }}
        >
          <ChevronRightIcon />
        </IconButton>
      </Box>
    </>
  );
};

export default CaraselMain;
