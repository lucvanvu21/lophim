import MoviesList from '@/components/listmovies/moviesList';
import { moviesRequestApi } from '@/requestApi/movies/movies';
import { Typography } from '@mui/material';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Xem Phim Đang Chiếu Phim Hay Phim Mới Nhất Tại Rạp',
  description:
    'lophim - Phim Đang Chiếu Phim Hay Phim Mới Nhất Tại Rạp chất lượng cao miễn phí với phụ đề tiếng việt - thuyết minh - lồng tiếng, có nhiều thể loại phim phong phú, đặc sắc, nhiều bộ phim hay nhất - mới nhất.',
};
const Hot = async ({ searchParams }: { searchParams: { page: number } }) => {
  const page = searchParams.page || 1;
  const res = await moviesRequestApi.getAllMoviesForUser('hoat-hinh', page, 18);
  return (
    <>
      <Typography variant="h4" fontWeight={600} component={'h1'}>
        Danh sách phim hoạt hình{' '}
      </Typography>
      <MoviesList movies={res.data.items} paginate={res?.data?.params?.pagination} />
    </>
  );
};

export default Hot;
