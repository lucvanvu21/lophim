'use client';
import { IMovies } from '@/types';
import Image from 'next/image';
import React from 'react';

const MoviesCard = ({ movies }: { movies: any }) => {
  const imageLoader = ({ src, width, quality }) => {
    return `${src}?w=${width}&q=${quality || 60}`;
  };
  return (
    <>
      <Image
        // loader={imageLoader}
        // fill={true}
        // unoptimized
        src={
          movies?.poster_url.startsWith('https')
            ? `${movies?.poster_url}`
            : `${process.env.NEXT_PUBLIC_IMAGE}${movies?.poster_url}`
        }
        // src={`${movies?.thumb_url}`}
        alt={movies?.slug}
        loading="lazy"
        placeholder="blur"
        blurDataURL="data:image/svg+xml;base64,..."
        sizes="50vw"
        quality={50}
        style={{
          width: '100%',
          height: '100%',
          borderRadius: '8px',
          objectFit: 'contain',
          transition: 'transform 0.3s ease',
        }}
        width={40}
        height={50}
      />
    </>
  );
};

export default MoviesCard;
