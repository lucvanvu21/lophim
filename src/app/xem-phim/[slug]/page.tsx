import { moviesRequestApi } from '@/requestApi/movies/movies';
import { Box, Divider, Typography } from '@mui/material';
import React from 'react';
import IframeMovies from '@/components/iframe';
import Header from '@/components/layout/header';
import { notFound } from 'next/navigation';
import EmblaCarouselz from '@/components/carasel';

// export async function generateStaticParams() {
//   const le = await moviesRequestApi.getAllMoviesForUser('phim-le', 1, 10);
//   const tv = await moviesRequestApi.getAllMoviesForUser('phim-bo', 1, 10);
//   const movies = [...le?.data.items, ...tv?.data.items];
//   return movies?.map((movie: any) => ({ slug: movie.slug }));
// }
const Watch = async ({ params }: { params: { slug: string } }) => {
  const slug = params.slug;
  const res = await moviesRequestApi.getMoviesBySlug(slug);
  const moiPhatHanh = await moviesRequestApi.getMovieNew('phim-moi-cap-nhat-v2', 1, 30);
  const day = 'day';
  // const hot = await tmdbApiClient.getTop2(day);
  if (res.error) {
    notFound();
  }
  if (res.status === false) {
    return <>Phim đang được cập nhật , bạn có thể quay lại sau !</>;
  }
  const movies: any = res?.movie;

  return (
    <>
      <Header />
      <Box>
        <Box sx={{ mx: { xs: '0', sm: '2rem', md: '3rem', lg: '7rem' }, mt: '4.5rem' }}>
          <IframeMovies res={res} tmdb={movies?.tmdb} />
        </Box>

        {/* <Box sx={{ mx: { xs: '0', sm: '2rem', md: '3rem', lg: '7rem' }, mt: '4.5rem' }}>
        <VideoPlayer src={res?.episodes[0]?.server_data[0]?.link_m3u8}/>
        </Box> */}

        <Box sx={{ mx: { xs: '0', sm: '2rem', md: '3rem', lg: '7rem' } }}>
          <Box
            sx={{ marginTop: 2, marginBottom: 4, display: 'flex', flexDirection: 'column', gap: 2, marginX: { xs: '0.3rem' } }}
          >
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
          <Typography
            variant="h5"
            component={'h1'}
            sx={{ fontSize: { xs: '1.4rem', sm: '1.8rem', md: '2.2rem', lg: '2.2rem', xl: '2.2rem' }, my: 2 }}
          >
            Phim mới cập nhật
          </Typography>
          <EmblaCarouselz movies={moiPhatHanh?.items} />
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
