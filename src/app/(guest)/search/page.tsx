import MoviesList from '@/components/listmovies/moviesList';
import { moviesRequestApi } from '@/requestApi/movies/movies';
import { Typography } from '@mui/material';
import React from 'react';

const Search = async ({ searchParams }: { searchParams: { q: string } }) => {
  const query = searchParams.q || '';

  // const res = await moviesRequestApi.getSearch(query, 1, 10);
  const res = await moviesRequestApi.getSearch(query, 1, 10);
  // conso

  return (
    <>
      <Typography component={'h1'} variant='h4'>Kết quả tìm kiếm cho `{query}` </Typography>
      <MoviesList movies={res?.data?.items} paginate={res?.data?.params?.pagination}  />
    </>
  );
};

export default Search;
