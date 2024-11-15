import { moviesRequestApi } from '@/requestApi/movies/movies';
import React from 'react';
import MoviesList from '@/components/listmovies/moviesList';
import { Typography } from '@mui/material';

const Genres = async ({ params, searchParams }: { params: { slug: string }; searchParams: { page: number } }) => {
  // console.log('---->searchParams:', searchParams);
  const page = searchParams.page || 1;
  const res = await moviesRequestApi.getMoviesByGenre(params.slug, page, 24);
  // console.log('---->res---genres:', res);
  return (
    <>
      <Typography variant='h4' component={'h1'}>Phim theo thể loại</Typography>
      <MoviesList movies={res?.data?.items} paginate={res?.data?.params?.pagination} />
    </>
  );
};

export default Genres;
