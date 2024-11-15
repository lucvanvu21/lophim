import FooterLayout from '@/components/layout/footer';
import Header from '@/components/layout/header';
import MoviesCard from '@/components/listmovies/moviesCard';
import RatingEpisodes from '@/components/ratingEpisodes';
import { moviesRequestApi } from '@/requestApi/movies/movies';
import { tmdbApi } from '@/requestApi/tmdb';
import { IMovies } from '@/types';
import { Box, Button, Chip, Container, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import type { Metadata, ResolvingMetadata } from 'next';
import { baseOpenGraph } from '@/app/shared-metadata';
import { notFound } from 'next/navigation';
import CountEpisodes from '@/components/countEpisodes';
import EmblaCarouselz from '@/components/carasel';
import Bookmark from '@/components/bookmark';
// import { moviesRequestApiClient } from '@/requestApi/movies/moviesClient';

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ params, searchParams }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  // read route params
  const slug = (await params).slug as string;

  // console.log('---->slug:', slug);

  const data = await moviesRequestApi.getMoviesBySlug(slug);
  if (data.status === false) {
    notFound();
  }
  const movies: any = data?.movie;
  // console.log('---->movies:', movies);
  const url = process.env.NEXT_PUBLIC_BASE_URL + '/chi-tiet-phim/' + slug;
  // console.log('---->movies:', movies);

  return {
    title: `Xem phim ${movies?.name} - ${movies?.origin_name} - Vietsub `,
    description: `${movies?.content.slice(0, 300)}...`,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `Phim ${movies?.name} - ${movies?.origin_name} - Vietsub - lophim`,
      description: movies?.content,
      url,
      images: [
        {
          url: `${movies?.thumb_url}`,
          alt: movies?.name,
        },
      ],

      ...baseOpenGraph,
    },
    // };
  };
}

export async function generateStaticParams() {
  const le = await moviesRequestApi.getAllMoviesForUser('phim-le', 1, 10);
  const tv = await moviesRequestApi.getAllMoviesForUser('phim-bo', 1, 10);
  // const movies = [...le?.data.items, ...tv?.data.items];
  // console.log('---->movies:', movies);
  const movies = [...le?.data.items];
  // console.log('---->movies:', movies);
  if (!Array.isArray(movies)) {
    throw new Error('Expected an array for results');
  }
  return movies?.map((movie: any) => ({ slug: movie.slug }));
}

const Detail = async ({ params }: { params: { slug: string } }) => {
  // console.log('---->params:', params.slug);
  // const token = await getServerSession(authOptions);

  const slug = params.slug as string;

  // console.log('---->slug:', slug);
  const res = await moviesRequestApi.getMoviesBySlug(slug);
  // console.log('---->res:', res);
  // console.log('---->res:', res);
  if (res.error) {
    notFound();
  }
  const movies: any = res?.movie;

  // const type = movies.type === 'series' ? 'tv' : 'movie';
  const actor = await tmdbApi.getActor(movies?.tmdb?.type, movies?.tmdb?.id);
  // let rateEpisode;
  // // let response;

  // if (movies?.mediaType === 'tv') {
  //   rateEpisode = await tmdbApi.getRateEpisode(movies?.mediaTmdbId);
  //   // response = await moviesRequestApi.getEpisodeCount(movies?._id);
  // }
  // const rate = await tmdbApi.getRate(movies?.mediaImdbId);

  // const year = new Date(movies?.mediaYear).getFullYear();

  // console.log('---->res:', movies);
  // console.log('---->response:', response);
  return (
    <>
      <Header></Header>
      <Box sx={{ height: '100vh', width: '100vw' }}>
        <Box
          sx={{
            position: 'relative',
            width: '100vw',
            height: '550px',
            // top: 10,
            backgroundColor: 'rgba(2, 13, 24, .65)',
          }}
        >
          <Image
            // src={`${process.env.NEXT_PUBLIC_BACKDROPS}${movies?.mediaThum}`}
            src={`${movies?.thumb_url}`}
            alt={movies?.slug}
            sizes="80vw"
            fill
            quality={60}
            style={{
              objectFit: 'cover',
              objectPosition: 'center 30%',
              zIndex: -1,
            }}
          />
        </Box>
        <Container sx={{ position: 'relative', zIndex: 10 }}>
          <Grid container spacing={5} sx={{ marginTop: { sm: -25, xs: -45, md: -35 } }}>
            <Grid size={{ xs: 12, sm: 4, md: 3 }}>
              <Box sx={{ marginX: { xs: '40px', sm: '0px', md: '0px', lg: '0px', xl: '0px' } }}>
                <MoviesCard movies={movies} />
                <Link href={'/xem-phim/' + movies?.slug}>
                  <Button
                    variant="contained"
                    sx={{
                      width: '100%',
                      marginTop: '1rem',
                      padding: '0.55rem',
                      background: 'linear-gradient(to right, #fc000c 0, #f9444d 100%)',
                      '&:hover': {
                        background: 'linear-gradient(to right, rgba(252, 0, 12, 0.8) 0%, rgba(249, 68, 77, 0.8) 100%)',
                      },
                      fontSize: '1rem',
                    }}
                  >
                    Xem Ngay
                  </Button>
                </Link>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, sm: 8, md: 9 }}>
              <Box sx={{ color: '#fff', display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Typography
                  variant="h3"
                  component={'h1'}
                  fontWeight={600}
                  // sx={{
                  //   fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem', lg: '3rem', xl: '3rem' },
                  // }}
                >
                  {movies?.name}
                </Typography>
                <Typography
                  variant="h4"
                  component={'h2'}
                  sx={{
                    color: '#ddd',
                    // fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem', lg: '3rem', xl: '3rem' },
                  }}
                >
                  {movies?.origin_name} ({movies?.year})
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Typography alignContent="center" sx={{ color: '#ddd', fontStyle: 'italic' }}>
                    Thời lượng :
                  </Typography>
                  <Typography fontWeight={600}>{movies?.time}</Typography>
                </Box>
                {/* <Typography sx={{ paddingTop: '3rem' }}>imdb: {movies.mediaRate}</Typography> */}
                {/* <Box sx={{ display: 'flex', gap: 7 }}>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Box
                      sx={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'rgb(245, 197, 24)', // Màu nền vàng của IMDb
                        color: 'black', // Màu chữ đen
                        paddingX: '6px', // Khoảng cách ngang giữa các chữ cái
                        paddingY: '2px', // Khoảng cách dọc
                        borderRadius: '4px', // Bo tròn góc
                        fontWeight: '700', // Độ đậm chữ
                        fontSize: '14px', // Kích thước chữ
                      }}
                    >
                      IMDb
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Box
                      sx={{
                        fontWeight: '700', // Độ đậm chữ
                        fontSize: '14px',
                        backgroundColor: '#01b4e4',
                        borderRadius: '1rem',
                        paddingX: '4px',
                      }}
                    >
                      {' '}
                      TMDB{' '}
                    </Box>
                  </Box>
                </Box> */}

                {/* <Bookmark movieId={movies?._id} /> */}
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Typography alignContent="center" sx={{ color: '#ddd', fontStyle: 'italic' }}>
                    Thể Loại :
                  </Typography>
                  {movies?.category?.map((item, index) => (
                    <Link href={`/the-loai/${item.slug}`} key={item.id}>
                      <Chip
                        label={item.name}
                        sx={{
                          '&:hover': {
                            backgroundColor: 'rgba(255, 255, 255, 0.4)',
                            color: 'black',
                            cursor: 'pointer',
                            textDecoration: 'none',
                          },
                        }}
                      />
                    </Link>
                  ))}
                </Box>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Typography alignContent="center" sx={{ color: '#ddd', fontStyle: 'italic' }}>
                    Quốc gia :
                  </Typography>

                  {movies?.country.map((item, index) => (
                    <Link href={`/quoc-gia/${item.slug}`} key={item?.id}>
                      <Chip
                        label={item.name}
                        sx={{
                          '&:hover': {
                            backgroundColor: 'rgba(255, 255, 255, 0.4)',
                            color: 'black',
                            cursor: 'pointer',
                            textDecoration: 'none',
                          },
                        }}
                      />
                    </Link>
                  ))}
                </Box>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Typography alignContent="center" sx={{ color: '#ddd', fontStyle: 'italic' }}>
                    Tình trạng :
                  </Typography>

                  <Typography alignContent="center" sx={{ color: '#ddd', fontStyle: 'italic' }}>
                    {movies?.episode_current}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Typography alignContent="center" sx={{ color: '#ddd', fontStyle: 'italic' }}>
                    Số tập :
                  </Typography>
                  <Typography alignContent="center" sx={{ color: '#ddd', fontStyle: 'italic' }}>
                    {movies?.episode_total}
                  </Typography>
                </Box>
                {/* <Box sx={{ display: 'flex', gap: 1 }}>
                  <Typography alignContent="center" sx={{ color: '#ddd', fontStyle: 'italic' }}>
                    Chất lượng :
                  </Typography>
                  <Typography alignContent="center" sx={{ color: '#ddd', fontStyle: 'italic' }}>
                    {movies?.quality}
                  </Typography>
                </Box> */}
                {/* {movies?.mediaType === 'tv' && <CountEpisodes tvId={movies?._id} />} */}
                {/* {movies?.mediaType === 'tv' && <CountEpisodes count={response} />} */}
                {/* <CountEpisodes tvId={movies?._id} /> */}

                <Typography fontStyle={'italic'} color="#ddd">
                  {movies?.content}
                </Typography>
              </Box>

              <Box sx={{ marginTop: 2 }}>
                <Typography alignContent="center" sx={{ color: '#ddd', fontStyle: 'italic' }}>
                  Diễn Viên :
                </Typography>
                <Box sx={{ display: 'flex',mt:2 }}>
                  {/* <AutoPlay movies={actor} /> */}
                  {actor && actor.length > 0 ? (
                    <EmblaCarouselz movies={actor} />
                  ) : (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                      {movies?.actor?.map((item: any, index: number) => (
                        <Typography key={index} color="#ddd" component="span">
                          {item}
                          {index < movies.actor.length - 1 && ', '}
                        </Typography>
                      ))}
                    </Box>
                  )}
                </Box>
              </Box>
            </Grid>
          </Grid>
          {/* {movies?.mediaType === 'tv' && rateEpisode.length > 0 && (
            <Container>
              <Box sx={{ fontSize: '24px', display: 'flex', marginTop: '2rem', marginBottom: '0.75rem' }}>
                Điểm đánh giá{' '}
                <Box
                  sx={{
                    marginX: '0.5rem',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'rgb(245, 197, 24)', // Màu nền vàng của IMDb
                    color: 'black', // Màu chữ đen
                    paddingX: '6px', // Khoảng cách ngang giữa các chữ cái
                    paddingY: '2px', // Khoảng cách dọc
                    borderRadius: '4px', // Bo tròn góc
                    fontWeight: '700', // Độ đậm chữ
                    fontSize: '18px', // Kích thước chữ
                    fontFamily: 'Arial, sans-serif', // Font chữ của IMDb
                  }}
                >
                  IMDb
                </Box>
                :
              </Box>
              <RatingEpisodes dataRate={rateEpisode} />
            </Container>
          )} */}
        </Container>

        <FooterLayout />
      </Box>
    </>
  );
};

export default Detail;
