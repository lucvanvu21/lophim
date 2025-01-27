import Iframe from '@/components/iframe';
import React from 'react';
import { moviesServer } from '@/requestApi/movies/moviesServer';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export async function generateMetadata({ params, searchParams }): Promise<Metadata> {
  const episodeNumber = searchParams.tap;
  const data = await moviesServer.getMovieBySlug<IMovieResponse<IMovie>>(params.slug);
  if (data.status !== 'success') return;
  return {
    title: `Xem phim ${data?.movie.name} tập ${episodeNumber || 'Full'} - HD`,
    description: `Xem phim ${data?.movie?.name} tập ${episodeNumber || 'Full'} - ${data?.movie.description.slice(0, 155)}...`,
    robots: 'index, follow',
  };
}
const XemPhim = async ({ params }: { params: { slug: string } }) => {
  const { slug } = params;
  const data = await moviesServer.getMovieBySlug<IMovieResponse<IMovie>>(slug);
  // console.log('movie', data);

  if (data.status !== 'success') {
    return notFound();
  }
  // const movie = data?.data?.movie;
  return (
    <div className="mt-[67px]">
      <>
        <Iframe movie={data.movie} />
      </>
      <div className="container mx-auto px-2">
        <h1 className="text-3xl font-semibold mt-5">
          Xem Phim {data?.movie?.name} ({new Date(data?.movie?.category['3'].list[0].name).getFullYear()})
        </h1>
        <h2 className="text-gray-200 text-xl ">{data?.movie?.original_name}</h2>
        {/* <h4 className="text-gray-400 text-lg italic">Phát hành : {data?.movie?.year}</h4> */}
        <p className="text-lg text-gray-400">{data?.movie?.description}</p>
      </div>
    </div>
  );
};

export default XemPhim;
