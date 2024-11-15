import MoviesList from '@/components/listmovies/moviesList';
import { moviesRequestApi } from '@/requestApi/movies/movies';
import { Typography } from '@mui/material';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Xem Phim Lẻ Phim Bộ  Phim Mới Nhất ',
  description:
    'lophim.site - Phim Đang Chiếu Phim Hay Phim Mới Nhất chất lượng cao miễn phí với phụ đề tiếng việt, có nhiều thể loại phim phong phú, đặc sắc, nhiều bộ phim hay nhất - mới nhất.',
};
const Movies = async ({ params, searchParams }: { params: { type: string }; searchParams: { page: number } }) => {
  const page = searchParams.page || 1;
  let res: any;
  if (params.type === 'phim-le') {
    res = await moviesRequestApi.getAllMoviesForUser('phim-le', page, 18);
  } else if (params.type === 'phim-bo') {
    res = await moviesRequestApi.getAllMoviesForUser('phim-bo', page, 18);
  } else if (params.type === 'hoat-hinh') {
    res = await moviesRequestApi.getAllMoviesForUser('hoat-hinh', page, 18);
  }
  return (
    <>
      <Typography variant="h4" fontWeight={600} component={'h1'}>
        Danh sách phim {params.type === 'phim-le' ? 'lẻ' : params.type === 'phim-bo' ? 'bộ' : 'hoạt hình'}
      </Typography>
      <MoviesList movies={res.data.items} paginate={res?.data?.params?.pagination} />
    </>
  );
};

export default Movies;
