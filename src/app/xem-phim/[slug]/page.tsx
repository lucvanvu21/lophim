import { moviesRequestApi } from '@/requestApi/movies/movies';
import { Box, Divider, Typography } from '@mui/material';
import React from 'react';
import IframeMovies from '@/components/iframe';
import Header from '@/components/layout/header';
import { notFound } from 'next/navigation';
import { moviesRequestApiClient } from '@/requestApi/movies/moviesClient';
import EmblaCarouselz from '@/components/carasel';
import TopMovies from '@/components/topMovies';
import { tmdbApiClient } from '@/requestApi/tmdb/tmdbApiClient';

// export async function generateStaticParams() {
//   const le = await moviesRequestApi.getAllMoviesForUser('phim-le', 1, 10);
//   const tv = await moviesRequestApi.getAllMoviesForUser('phim-bo', 1, 10);
//   const movies = [...le?.data.items, ...tv?.data.items];
//   return movies?.map((movie: any) => ({ slug: movie.slug }));
// }
const Watch = async ({ params }: { params: { slug: string } }) => {
  const slug = params.slug;
  const res = await moviesRequestApi.getMoviesBySlug(slug);
  const moiPhatHanh = await moviesRequestApi.getMoviesUpdateForUser('phim-moi-cap-nhat', 1, 16);
  const day = 'day';
  const hot = await tmdbApiClient.getTop2(day);
  if (res.error) {
    notFound();
  }
  const movies: any = res?.movie;

  return (
    <>
      <Header />
      <Box>
        <Box sx={{ mx: { xs: '0', sm: '2rem', md: '3rem', lg: '7rem' }, mt: '4.5rem' }}>
          <IframeMovies res={res} tmdb={movies?.tmdb} hot={hot} />
        </Box>
        <Box sx={{ mx: { xs: '0', sm: '2rem', md: '3rem', lg: '7rem' } }}>
          <Box sx={{ marginTop: 2,marginBottom:4, display: 'flex', flexDirection: 'column', gap: 2, marginX: { xs: '0.3rem' } }}>
            <Typography
              variant="h4"
              fontWeight={500}
              sx={{
                fontSize: { xs: '1.6rem', sm: '1.8rem', md: '2.2rem', lg: '2.2rem', xl: '2.2rem' },
              }}
            >
              {movies?.name}
            </Typography>
            <Typography
              variant="h5"
              fontWeight={500}
              color="#ddd"
              fontStyle={'italic'}
              sx={{
                fontSize: { xs: '1.4rem', sm: '1.8rem', md: '2.2rem', lg: '2.2rem', xl: '2.2rem' },
              }}
            >
              {movies?.origin_name} ({movies?.year})
            </Typography>
            <Typography fontStyle={'italic'} color="#ddd" fontWeight={500}>
              {movies?.content}
            </Typography>
          </Box>
          <EmblaCarouselz movies={moiPhatHanh?.items} />
          <Box sx={{ display: { xs: 'block', lg: res?.movie?.episode_total > 1 ? 'none' : 'block' } }}>
          {' '}
          <Box sx={{ marginTop: '1rem' }}>
            <Typography
              variant="h4"
              // fontWeight={600}
              component={'h1'}
              color={'primary'}
              sx={{ display: 'flex', fontSize: { xs: '1.15rem', sm: '1.25rem', md: '1.5rem' }, textTransform: 'uppercase' }}
            >
              Top xem nhiều
            </Typography>
            <TopMovies hot={hot} />
          </Box>
        </Box>
        </Box>
      </Box>
      <Box
        sx={{
          mx: { xs: '0', sm: '2rem', md: '3rem', lg: '7rem' },
          mt: 3,
        }}
      >
        {/* <Container sx={{ mt: 3 }}> */}
        <Divider />
        <Typography sx={{ mt: 3 }} color="#b5b5b5" lineHeight={2}>
          lophim - Trang web xem phim trực tuyến miễn phí chất lượng cao với giao diện trực quan, tốc độ tải trang nhanh, cùng kho
          phim với hơn 10.000+ phim mới, phim hay, luôn cập nhật phim nhanh, hứa hẹn sẽ đem lại phút giây thư giãn cho bạn.
        </Typography>
        {/* </Container> */}
        {/* <FooterLayout></FooterLayout> */}
      </Box>
    </>
  );
};

export default Watch;
