import Header from '@/components/layout/header';
import MoviesList from '@/components/listmovies/moviesList';
import { moviesRequestApi } from '@/requestApi/movies/movies';
import { Box, Container, Divider, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import Link from 'next/link';
import FooterLayout from '@/components/layout/footer';
import { Metadata } from 'next';
import EmblaCarouselz from '@/components/carasel';
import CaraselMain from '@/components/caraselMain';
import { moviesRequestApiClient } from '@/requestApi/movies/moviesClient';
import TopMovies from '@/components/topMovies';
import MoviesCard from '@/components/listmovies/moviesCard';
import { tmdbApiClient } from '@/requestApi/tmdb/tmdbApiClient';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Xem phim online chất lượng cao FullHD Vietsub | Phim tốc độ',
  description:
    'Xem phim hay nhất 2024 cập nhật nhanh nhất, Xem Phim Online HD Vietsub - Thuyết Minh tốt trên nhiều thiết bị - Phim Online Full HD hấp dẫn nhất',
};
export default async function Home() {
  
  const resTv = await moviesRequestApi.getAllMoviesForUser('phim-bo', 1, 12);
  // const resTv2 = await moviesRequestApi.getAllMoviesForUser('phim-bo', 2, 12);
  // console.log('---------sdfsdf',resTv.data);
  const resMovies = await moviesRequestApi.getAllMoviesForUser('phim-le', 1, 12);
  const resHoatHinh = await moviesRequestApi.getAllMoviesForUser('hoat-hinh', 1, 12);
  const resMoiPhatHanh = await moviesRequestApi.getMovieNew('phim-moi-cap-nhat', 1, 16);
  const hot = await tmdbApiClient.getTop2('day');

  // console.log('---------sdfsdf', res3Hot);

  const tv = resTv?.data?.items;
  const movies = resMovies?.data?.items;
  const moiPhatHanh = resMoiPhatHanh?.items;
  // console.log('---------sdfsdf',tv);
  // const tv = [...resTv?.items, ...resTv2?.items.slice(0, 2)];
  // const movies = [...resMovies?.items, ...resMovies2?.items.slice(0, 2)];
  // const hot = res3Hot?.items;
  // console.log('---------sdfsdf', hot);
  // const top = hot?.result?.slice(0, 4);

  return (
    <>
      <Box>
        <Header />
      </Box>
      <Container>
        <Box sx={{ marginBottom: '1rem',marginTop:'85px' }}>
          <Typography
            variant="h4"
            color={'primary'}
            sx={{ marginY: '1rem', fontSize: { xs: '1.15rem', sm: '1.25rem', md: '1.5rem' }, textTransform: 'uppercase' }}
            component={'h1'}
          >
            Phim Hoạt Hình
          </Typography>
          {/* <AutoPlay movies={hot?.result}></AutoPlay> */}
          <EmblaCarouselz movies={resHoatHinh?.data?.items} autoPlay={true} />
        </Box>
        <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 4 }}>
          <Grid size={{ xs: 12, md: 9 }}>
            <Divider />

            <Box sx={{ marginBottom: '1rem', marginTop: '1rem' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography
                  variant="h4"
                  // fontWeight={600}
                  component={'h1'}
                  color={'primary'}
                  sx={{ display: 'flex', fontSize: { xs: '1.15rem', sm: '1.25rem', md: '1.5rem' }, textTransform: 'uppercase' }}
                >
                  Phim Lẻ Mới Cập Nhật
                </Typography>
                <Typography
                  sx={{
                    '&:hover': {
                      color: '#ff9e13',
                      // transition: 'color 0.3s ease',
                    },
                  }}
                  // variant="h7"
                >
                  <Link
                    href="/movies"
                    style={{
                      height: '100%',
                      display: 'inline-flex',
                      alignItems: 'center',
                      marginLeft: '0.4rem',
                      textDecoration: 'none',
                      color: 'inherit',
                      // transition: 'color 0.3s ease',
                    }}
                  >
                    Xem thêm
                    <PlayArrowIcon sx={{ fontSize: '1.2rem', marginLeft: '0.2rem' }} />
                  </Link>
                </Typography>
              </Box>

              <MoviesList movies={movies} column={true} />
            </Box>
            <Divider />
            <Box sx={{ marginBottom: '1rem', marginTop: '1rem' }}>
              <Box
                sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                // variant="h5"
                // sx={{ height: '100%', fontSize: '1rem', marginLeft: '0.2rem' }}
              >
                <Typography
                  variant="h4"
                  // fontWeight={600}
                  component={'h1'}
                  color={'primary'}
                  sx={{ display: 'flex', fontSize: { xs: '1.15rem', sm: '1.25rem', md: '1.5rem' }, textTransform: 'uppercase' }}
                >
                  Phim Bộ Mới Cập Nhật
                </Typography>
                <Typography
                  sx={{
                    '&:hover': {
                      color: '#ff9e13',
                      // transition: 'color 0.3s ease',
                    },
                  }}
                >
                  <Link
                    href="/tv"
                    style={{
                      height: '100%',
                      display: 'inline-flex',
                      alignItems: 'center',
                      marginLeft: '0.4rem',
                      textDecoration: 'none',
                      color: 'inherit',
                      // transition: 'color 0.3s ease',
                    }}
                  >
                    Xem thêm
                    <PlayArrowIcon sx={{ fontSize: '1.2rem', marginLeft: '0.2rem' }} />
                  </Link>
                </Typography>
              </Box>
              <MoviesList movies={tv} column={true} />
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <Divider />
            <Box sx={{ margin: '1rem 0' }}>
              <Typography
                variant="h4"
                // fontWeight={600}
                component={'h1'}
                color={'primary'}
                sx={{ display: 'flex', fontSize: { xs: '1.15rem', sm: '1.25rem', md: '1.5rem' }, textTransform: 'uppercase' }}
              >
                Phim mới Cập nhật
              </Typography>
              {/* <Box> */}
              <Grid container sx={{ marginTop: '1rem', maxWidth: '365px' }} columnSpacing={1} rowSpacing={1}>
                {moiPhatHanh?.map((item: any, index: number) => (
                  <Box
                    key={item._id}
                    sx={{
                      display: 'flex',
                      maxHeight: { md: '150px' },
                      alignItems: 'center',
                      backgroundColor: index % 2 === 0 ? '' : '#1a2a3c',
                    }}
                  >
                    <Grid size={3}>
                      <Link href={'chi-tiet-phim/' + item.slug}>
                        <Box
                          sx={{
                            maxHeight: { md: '79px' },
                            overflow: 'hidden',
                            borderRadius: '8px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <Image
                            src={
                              item?.poster_url.startsWith('https')
                                ? `${item?.poster_url}`
                                : `${process.env.NEXT_PUBLIC_IMAGE}${item?.poster_url}`
                            }
                            // src={`${item?.thumb_url}`}
                            alt={movies?.slug}
                            loading="lazy"
                            placeholder="blur"
                            blurDataURL="data:image/svg+xml;base64,..."
                            sizes="50vw"
                            quality={50}
                            // fill
                            objectFit="cover"
                            style={{
                              width: '100%',
                              height: '100%',
                              borderRadius: '8px',
                              objectFit: 'cover',
                              transition: 'transform 0.3s ease',
                            }}
                            width={40}
                            height={50}
                          />
                        </Box>
                      </Link>
                    </Grid>
                    <Grid size={9} sx={{ marginLeft: '10px' }}>
                      <Link href={'chi-tiet-phim/' + item.slug}>
                        <Typography
                          sx={{
                            '&:hover': {
                              color: 'primary.main',
                            },
                          }}
                        >
                          {item.name}
                        </Typography>
                      </Link>
                      <Typography fontStyle="italic" sx={{ color: '#dddddd', fontSize: '12px' }}>
                        {item.year}
                      </Typography>
                    </Grid>
                  </Box>
                ))}
              </Grid>
              {/* </Box> */}
            </Box>
            <Divider />

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
          </Grid>
        </Grid>
        {/* <Divider /> */}
      </Container>

      <Box>
        <FooterLayout />
      </Box>
    </>
  );
}
