import TableMoviesAdmin from '@/components/admin/movies/table.movies';
import { moviesRequestApi } from '@/requestApi/movies/movies';
import { authOptions } from '@/utils/authOptions';
import { getServerSession } from 'next-auth';

const Incomplete = async () => {
  const page = 1;
  const limit = 150;
  const token = await getServerSession(authOptions);
  const res = await moviesRequestApi.findComplete(page, limit, token?.access_token);
  // console.log('---->res---moives:', res);
  return (
    <>
      <TableMoviesAdmin limit={limit} data={res ? res : []}></TableMoviesAdmin>
    </>
  );
};

export default Incomplete;
