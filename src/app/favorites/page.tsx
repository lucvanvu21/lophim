import FooterLayout from '@/components/layout/footer';
import Header from '@/components/layout/header';
import MoviesList from '@/components/listmovies/moviesList';
import { moviesRequestApiClient } from '@/requestApi/movies/moviesClient';
import { authOptions } from '@/utils/authOptions';
import { Box, Container, Typography } from '@mui/material';
import { getServerSession } from 'next-auth';
import React from 'react';

const Favorites = async ({ searchParams }: { searchParams: { page: number } }) => {
  const token = await getServerSession(authOptions);
  if (!token) {
    return (
      <>
        <Header />
        <Container sx={{ mt: 20 }}>
          <Typography variant="h5" align="center">
            Bạn chưa đăng nhập !!
          </Typography>
        </Container>
        <FooterLayout />
      </>
    );
  }
  const page = searchParams.page || 1;
  const getFavorites = await moviesRequestApiClient.getFavorites(token?.access_token, page, 18);

  // console.log('---->getFavorites:', getFavorites);
  return (
    <>
      <Header />
      <Container sx={{ mt: 10 }}>
        <Typography variant="h4" component={'h1'}>Danh sách phim đã yêu thích:</Typography>
        <Box>
          <MoviesList movies={getFavorites?.data} />
        </Box>
      </Container>
      <FooterLayout />
    </>
  );
};

export default Favorites;
