import { IMovies, IMoviesPaginate } from '@/types';
import { Box, Typography } from '@mui/material';
import React from 'react';
import Grid from '@mui/material/Grid2';
import Link from 'next/link';
import MoviesCard from './moviesCard';
import PaginationComp from '../pagination';

const MoviesList = ({ movies, column, paginate }: { movies: any; column?: boolean; paginate?: any }) => {
  // const cols = column ? column : 12;
  return (
    <>
      <Grid container spacing={2}>
        {movies?.map((item: any) => (
          <Grid size={{ xs: 6, sm: 3, md: column ? 3 : 2, lg: column ? 2 : 1.5 }} key={item._id}>
            <Box
              sx={{
                cursor: 'pointer',
                marginTop: '1rem',
                overflow: 'hidden',
                '&:hover': {
                  '& img': {
                    transform: 'scale(1.05)',
                  },
                },
              }}
            >
              <Link href={'/chi-tiet-phim/' + item.slug}>
                <Box
                  sx={{
                    position: 'relative',
                    maxHeight: '253px',
                    overflow: 'hidden',
                    borderRadius: '8px',
                    paddingBottom: '133.8%',
                  }}
                >
                  <MoviesCard movies={item} />
                  <Box sx={{ position: 'absolute', top: 3, right: 3 }}>
                    <Typography
                      sx={{
                        display: 'flex',
                        fontSize: { xs: '0.75rem', sm: '0.75rem', md: '0.75rem' },
                        backgroundColor:'#df7a5e',
                        p:'0.2rem',
                        borderRadius:'0.2rem',
                        // textTransform: 'uppercase',
                      }}
                    >
                      {item?.episode_current}
                    </Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    '&:hover': {
                      '& h3': {
                        color: 'primary.main',
                      },
                    },
                  }}
                >
                  <Typography
                    noWrap
                    sx={{
                      marginTop: '0.6rem',
                      textOverflow: 'ellipsis',
                      overflow: 'hidden',
                      whiteSpace: 'nowrap',
                      color: '#fff',
                      width: '100%',
                    }}
                    component={'h3'}
                  >
                    {item.name}
                  </Typography>
                  <Typography
                    noWrap
                    sx={{
                      textOverflow: 'ellipsis',
                      overflow: 'hidden',
                      whiteSpace: 'nowrap',
                      color: 'rgba(255,255,255,0.6)',
                      width: '100%',
                    }}
                    component={'h4'}
                  >
                    {item.origin_name}
                  </Typography>
                </Box>
              </Link>
            </Box>
          </Grid>
        ))}
      </Grid>
      {paginate?.totalItemsPerPage > 12 && <PaginationComp count={paginate?.totalPages} currentPage={paginate?.currentPage} />}
    </>
  );
};

export default MoviesList;
