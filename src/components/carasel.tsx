'use client';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { Box, IconButton, Skeleton, Typography } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Image from 'next/image';
import Link from 'next/link';

const ImageComponent = ({ item, getImageSrc }) => {
  return (
    <>
      <Image
        src={getImageSrc(item?.poster_url, item?.actorPoster) || 'https://i.imgur.com/o8AhA0H.png'}
        alt={item?.mediaNameVie || item?.actorName}
        placeholder="blur"
        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMAAAADA..."
        loading="lazy"
        // sizes="60vw"
        sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
        style={{
          width: '100%',
          height: '100%',
          borderRadius: '8px',
          objectFit: 'cover',
          maxHeight: item?.actorName ? 300 : '239px',
          // borderRadius: '8px',
          // display: isLoading ? 'none' : 'block',
        }}
        quality={60}
        width={140}
        height={170}
      />
    </>
  );
};

const EmblaCarouselz = ({ movies }) => {
  // const [mounted, setMounted] = useState(false);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);
  const autoplayInterval = useRef<NodeJS.Timeout | null>(null);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    skipSnaps: false,
    dragFree: true,
    containScroll: 'trimSnaps',
    breakpoints: {
      '(min-width: 1024px)': { slidesToScroll: 6 },
      '(min-width: 768px)': { slidesToScroll: 4 },
      '(min-width: 630px)': { slidesToScroll: 3 },
      '(max-width: 629px)': { slidesToScroll: 2 },
    },
  });

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

  const getImageSrc = (mediaPoster, actorPoster) => {
    if (mediaPoster?.startsWith?.('https')) return mediaPoster;
    if (mediaPoster?.startsWith?.('/')) return `${process.env.NEXT_PUBLIC_IMAGE}${mediaPoster}`;
    if (mediaPoster) return `${process.env.NEXT_PUBLIC_IMAGE}${mediaPoster}`;

    if (actorPoster?.includes?.('null')) return 'https://i.imgur.com/o8AhA0H.png';
    if (actorPoster?.startsWith?.('http')) return actorPoster;
    if (actorPoster?.startsWith?.('/')) return `${process.env.NEXT_PUBLIC_IMAGE}${actorPoster}`;
    if (actorPoster) return `/${actorPoster}`;

    return 'https://i.imgur.com/o8AhA0H.png';
  };

  // if (!mounted) return <LoadingSkeleton />;
  // console.log('movies', movies);
  return (
    <Box sx={{ position: 'relative', width: '100%' }}>
      <Box ref={emblaRef} sx={{ overflow: 'hidden' }}>
        <Box sx={{ display: 'flex', gap: 2 }}>
          {movies?.map(item => {
            const actorSlug = item?.actorName?.replace(/\s/g, '-').toLowerCase();
            const href = item?.actorId ? `/actor/${actorSlug}~${item?.actorId}` : `/chi-tiet-phim/${item?.slug}`;

            return (
              <Box
                key={item._id}
                sx={{
                  flexShrink: 0,
                  width: {
                    xs: '48%',
                    // sm: '33.333%',
                    sm: '23.6%',
                    md: '23.6%',
                    lg: item.actorId ? '15.1%' : '15.5%',
                  },
                  maxWidth: '185px',
                }}
              >
                <Box
                  sx={{
                    position: 'relative',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    transition: 'transform 0.3s',
                    '&:hover': {
                      transform: 'scale(1.05)',
                    },
                  }}
                >
                  <Link href={href}>
                    <Box>
                      <ImageComponent item={item} getImageSrc={getImageSrc} />
                      <Box
                        sx={{
                          position: 'absolute',
                          zIndex: 3,
                          bottom: '6px',
                          width: '100%',
                          bgcolor: 'rgba(0,0,0,0.6)',
                          p: 0.5,
                          borderRadius: '0 0 8px 8px',
                        }}
                      >
                        <Typography
                          noWrap
                          sx={{
                            textAlign: 'center',
                            color: '#fff',
                            width: '100%',
                            fontSize: '0.8rem',
                          }}
                        >
                          {item?.origin_name ? `${item?.origin_name} (${item.name})` : item?.actorName}
                        </Typography>
                        {item.character && (
                          <Typography
                            noWrap
                            sx={{
                              textAlign: 'center',
                              color: '#D4D4D4',
                              width: '100%',
                            }}
                          >
                            {item.character}
                          </Typography>
                        )}
                      </Box>
                    </Box>
                  </Link>
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
          bgcolor: 'rgba(0,0,0,0.7)',
          color: 'white',
          '&:hover': {
            bgcolor: 'rgba(0,0,0,1)',
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
          bgcolor: 'rgba(0,0,0,0.7)',
          color: 'white',
          '&:hover': {
            bgcolor: 'rgba(0,0,0,1)',
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
  );
};

export default EmblaCarouselz;
