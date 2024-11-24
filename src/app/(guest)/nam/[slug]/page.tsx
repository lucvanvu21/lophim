import { moviesRequestApi } from '@/requestApi/movies/movies';
import React from 'react';
import MoviesList from '@/components/listmovies/moviesList';
import { Typography } from '@mui/material';

const YearPage = async ({ params, searchParams }: { params: { slug: string }; searchParams: { page: number } }) => {
  // console.log('---->searchParams:', searchParams);
  // console.log('---->params:', params);
  const page = searchParams.page || 1;
  const res = await moviesRequestApi.getMovieByYear(params.slug, page, 24);
  // console.log('---->res---YearPage:', res);
  return (
    <>
      <Typography variant="h4" component={'h1'}>
        Phim năm {params.slug}
      </Typography>
      <MoviesList movies={res?.data?.items} paginate={res?.data?.params?.pagination} />
    </>
  );
};

export default YearPage;
