import { moviesRequestApi } from '@/requestApi/movies/movies';
import { Box, Typography } from '@mui/material';
import React from 'react';

const Dashboard = async () => {
  const res = await moviesRequestApi.countMovies();
  // console.log('---->res:', res);
  return (
    <>
      <Box sx={{display:'flex',flexDirection:'column',justifyContent:'center',gap:3}}>
        <Typography>Tổng số phim : {res?.data?.all}</Typography>
        <Typography>Tổng số phim lẻ : {res?.data?.movies}</Typography>
        <Typography>Tổng số phim bộ: {res?.data?.tv}</Typography>
      </Box>
    </>
  );
};

export default Dashboard;
