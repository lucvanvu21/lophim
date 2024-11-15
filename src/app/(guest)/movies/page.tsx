import MoviesList from '@/components/listmovies/moviesList';
import { moviesRequestApi } from '@/requestApi/movies/movies';
import { Typography } from '@mui/material';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Top Phim Lẻ Hay, Mới Nhất',
  description:
    'lophim - Xem phim online chất lượng cao miễn phí với phụ đề tiếng việt - thuyết minh - lồng tiếng, có nhiều thể loại phim phong phú, đặc sắc, nhiều bộ phim hay nhất - mới nhất.',
};
const Movies = async ({ searchParams }: { searchParams: { page: number } }) => {
  const page = searchParams.page || 1;
  const res = await moviesRequestApi.getAllMoviesForUser('phim-le', page, 18);
  // console.log('---->res:', res);

  return (
    <>
      <Typography variant="h4" fontWeight={600} component={'h1'}>
        Danh sách phim lẻ{' '}
      </Typography>
      <MoviesList movies={res?.data?.items} paginate={res?.data?.params?.pagination} />
    </>
  );
};

export default Movies;
