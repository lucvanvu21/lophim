'use client';
import Image from 'next/image';
import React, { useEffect } from 'react';
// import LoadingCard from './loading';
import { Skeleton } from './ui/skeleton';

const ImageCard = ({ movies, index }: { movies: IMovie; index?: number }) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [img, setImg] = React.useState<string>(movies?.thumb_url);
  useEffect(() => {
    // if (movies?.poster_url.startsWith('/')) {
    //   setImg(`${process.env.NEXT_PUBLIC_IMAGE}${movies?.poster_url}`);
    //   return;
    // }
    setImg(movies?.thumb_url);
  }, [movies]);
  return (
    <>
      {/* <div className="group relative overflow-hidden rounded-lg"> */}
      {/* {isLoading && <div>LOADING</div>} */}
      {/* <Suspense fallback={<LoadingCard />}> */}
      {isLoading && <Skeleton className="absolute inset-0 rounded-xl bg-muted" />}
      <Image
        // loader={imageLoader}
        // fill={true}
        // unoptimized
        src={img}
        alt={movies?.name + '|' + movies?.original_name}
        loading={index === 0 ? 'eager' : 'lazy'}
        priority={index === 0}
        placeholder="blur"
        blurDataURL="data:image/svg+xml;base64,..."
        sizes="50vw"
        quality={50}
        className="group-hover:scale-105 transition-transform duration-300 ease-in-out"
        onLoad={() => setIsLoading(false)}
        // onLoad={() => setIsLoading(true)}
        style={{
          width: '100%',
          borderRadius: '8px',
          height: '100%',
          transition: 'transform 0.3s ease',
        }}
        fill
        onError={() => {
          setIsLoading(false);
          setImg('/placeholder.png');
        }}
      />
      {/* </Suspense> */}
      {/* </div> */}
    </>
  );
};

export default ImageCard;

// // components/ImageCard.tsx
// 'use client';

// import Image from 'next/image';
// import React, { useState, useEffect } from 'react';
// import { Skeleton } from '@/components/ui/skeleton';

// const ImageCard = ({ movies }: { movies: IMovies }) => {
//   const [isLoading, setIsLoading] = useState(true);
//   const [optimizedSrc, setOptimizedSrc] = useState<string>('');

//   useEffect(() => {
//     if (movies?.poster_url.startsWith('/')) {
//       setOptimizedSrc(`${process.env.NEXT_PUBLIC_IMAGE}${movies?.poster_url}`);
//       return;
//     }
//     const originalSrc = movies?.poster_url.startsWith('http')
//       ? movies?.poster_url
//       : `${process.env.NEXT_PUBLIC_IMAGE}${movies?.poster_url}`;

//     // Kiểm tra cache
//     const cachedSrc = sessionStorage.getItem(`optimized_${movies._id}`);
//     if (cachedSrc) {
//       setOptimizedSrc(cachedSrc);
//       return;
//     }
//     // if (movies?.poster_url.startsWith('http')) {
//     //   setOptimizedSrc(movies?.poster_url);
//     //   sessionStorage?.setItem(`optimized_${movies._id}`, movies?.poster_url);
//     // }
//     // // Optimize và cache
//     // fetch('api/resize', {
//     //   method: 'POST',
//     //   headers: {
//     //     'Content-Type': 'application/json',
//     //   },
//     //   body: JSON.stringify({ url: originalSrc }),
//     // })
//     //   .then(res => res.json())
//     //   .then(data => {
//     //     // console.log(data);
//     //     setOptimizedSrc(data.optimizedUrl);
//     //     sessionStorage.setItem(`optimized_${movies._id}`, data.optimizedUrl);
//     //   })
//     //   .catch(() => {
//     //     setOptimizedSrc(originalSrc); // Fallback to original URL
//     //   });
//   }, [movies]);

//   // console.log('optimizedSrc:', optimizedSrc);
//   return (
//     <>
//       {isLoading && <Skeleton className="absolute inset-0 rounded-lg" />}
//       <Image
//         src={optimizedSrc || '/placeholder.png'}
//         alt={movies?.name + '|' + movies?.engName}
//         loading="lazy"
//         placeholder="blur"
//         blurDataURL="data:image/svg+xml;base64,..."
//         sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
//         quality={75} // Đã tối ưu rồi nên để 100%
//         className={`group-hover:scale-105 transition-all duration-300 ease-in-out ${isLoading ? 'opacity-0' : 'opacity-100'}`}
//         style={{
//           width: '100%',
//           borderRadius: '8px',
//           height: '100%',
//           transition: 'all 0.3s ease',
//         }}
//         fill
//         onLoadingComplete={() => setIsLoading(false)}
//         onError={() => {
//           setIsLoading(false);
//           setOptimizedSrc(movies?.poster_url || '/placeholder.png');
//         }}
//       />
//     </>
//   );
// };

// export default ImageCard;
