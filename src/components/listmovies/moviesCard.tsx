'use client';
import Image from 'next/image';
import React from 'react';

const MoviesCard = ({ movies }: { movies: any }) => {
  return (
    <>
      <Image
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
          objectFit: 'cover',
          transition: 'transform 0.3s ease',
        }}
        width={40}
        height={50}
      />
    </>
  );
};

export default MoviesCard;
