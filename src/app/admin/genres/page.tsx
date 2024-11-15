import { moviesRequestApi } from '@/requestApi/movies/movies';
import { authOptions } from '@/utils/authOptions';
import {
  Box,

} from '@mui/material';

import { getServerSession } from 'next-auth';
import React from 'react';
import TableGenres from '@/components/admin/genres/tableGenres';

const GenresAdmin = async () => {
  const token = await getServerSession(authOptions);
  // console.log('---->token:', token);
  const res = await moviesRequestApi.getGenres(token.access_token);
  // console.log('---->res---genres:', res);
  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <TableGenres res={res} token={token.access_token} />
      </Box>
    </>
  );
};

export default GenresAdmin;
