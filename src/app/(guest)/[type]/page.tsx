import MoviesList from '@/components/listmovies/moviesList';
import { moviesRequestApi } from '@/requestApi/movies/movies';
import { Typography } from '@mui/material';
import { Metadata } from 'next';

export const generateMetadata = async ({
  params,
  searchParams,
}: {
  params: { type: string };
  searchParams: { page: number };
}) => {
  // Bạn có thể tùy chỉnh title và description động dựa vào tham số loại phim và trang
  const page = searchParams.page || 1;
  let genre = '';
  let description = '';

  if (params.type === 'tv') {
    genre = 'phim lẻ';
    description = 'Xem phim lẻ với chất lượng cao và đầy đủ thể loại phim lẻ mới nhất';
  } else if (params.type === 'movies') {
    genre = 'phim bộ';
    description = 'Xem phim bộ hay nhất, phim bộ mới nhất miễn phí';
  } else if (params.type === 'hoat-hinh') {
    genre = 'hoạt hình';
    description = 'Xem phim hoạt hình hấp dẫn, đầy màu sắc với phụ đề tiếng Việt';
  }

  return {
    title: `Xem ${genre} - Lophim.site - Phim ${genre} Mới Nhất Chất Lượng Cao`,
    description: description || 'Lophim.site - Phim đang chiếu, phim hay, phim mới nhất chất lượng cao miễn phí.',
  };
};

const Movies = async ({ params, searchParams }: { params: { type: string }; searchParams: { page: number } }) => {
  const page = searchParams.page || 1;
  let res: any;
  if (params.type === 'movies') {
    res = await moviesRequestApi.getAllMoviesForUser('phim-le', page, 24);
  } else if (params.type === 'tv') {
    res = await moviesRequestApi.getAllMoviesForUser('phim-bo', page, 24);
  } else if (params.type === 'hoat-hinh') {
    res = await moviesRequestApi.getAllMoviesForUser('hoat-hinh', page, 24);
  }

  // console.log('---->res---genres:', res);
  return (
    <>
      <Typography variant="h4" fontWeight={600} component={'h1'}>
        Danh sách phim{' '}
        {params.type === 'movies' ? 'lẻ' : params.type === 'tv' ? 'bộ' : params.type === 'hoat-hinh' ? 'hoạt hình' : ''}
      </Typography>
      <MoviesList movies={res?.data?.items} paginate={res?.data?.params?.pagination} />
    </>
  );
};

export default Movies;
