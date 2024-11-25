'use client';
import Image from 'next/image';
import React from 'react';

const MoviesCard = ({ movies }: { movies: any }) => {
  const urlfull = `/api/resize?url=${process.env.NEXT_PUBLIC_IMAGE}${encodeURIComponent(movies?.poster_url)}&width=200&height=250`;
  // console.log('---->urlfull:', urlfull);
  const src = movies?.poster_url.startsWith('https') ? `${movies?.poster_url}` : `${urlfull}`;
  // console.log('---->src:', src);
 const url =  movies.imageUrl ? movies.imageUrl : `${process.env.NEXT_PUBLIC_IMAGE}${movies.poster_url}`;
  return (
    <>
      <Image
        src={url}
        // src={`${movies?.thumb_url}`}
        alt={movies?.slug}
        loading="lazy"
        placeholder="blur"
        blurDataURL="data:image/svg+xml;base64,..."
        sizes="50vw"
        quality={50}
        fill
        // objectFit="cover"
        style={{
          // width: '100%',
          // height: '100%',
          // borderRadius: '8px',
          objectFit: 'cover',
          transition: 'transform 0.3s ease',
        }}
        // width={40}
        // height={50}
      />
    </>
  );
};

export default MoviesCard;
