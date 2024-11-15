import TableMoviesAdmin from '@/components/admin/movies/table.movies';
import { moviesRequestApi } from '@/requestApi/movies/movies';
import { authOptions } from '@/utils/authOptions';
import { getServerSession } from 'next-auth';

const MoviesAdmin = async ({ params, searchParams }: { params: { type: string }; searchParams: { page: number } }) => {
  const type = params.type;
  const page = searchParams.page || 1;
  const limit = 15;

  const token = await getServerSession(authOptions);
  const res = await moviesRequestApi.getAllMovies(token?.access_token, type, page, limit);
  // console.log('---->res---moives:', token);
  // console.log('---->res---moives:', res);

  return (
    <>
      <TableMoviesAdmin limit={limit} data={res ? res : []}></TableMoviesAdmin>
    </>
  );
};

export default MoviesAdmin;
