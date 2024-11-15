import MoviesList from '@/components/listmovies/moviesList';
import { moviesRequestApi } from '@/requestApi/movies/movies';
import { Typography } from '@mui/material';
import React from 'react';

const Country = async ({ params, searchParams }: { params: { slug: string }; searchParams: { page: number } }) => {
  // console.log('---->searchParams:', searchParams);
  const page = searchParams.page || 1;
  const res = await moviesRequestApi.getMoviesByGenre(undefined, page, 24,params.slug);

  // console.log('---->res---genres:', res);
  return (
    <>
      <Typography variant='h4' component={'h1'}>Phim theo quốc gia</Typography>
      <MoviesList movies={res?.data?.items} paginate={res?.data?.params?.pagination} />
    </>
  )
};

export default Country;
