import { IMovies, IMoviesPaginate } from '@/types';
import { Box, Typography } from '@mui/material';
import React from 'react';
import Grid from '@mui/material/Grid2';
import Link from 'next/link';
import MoviesCard from './moviesCard';
import PaginationComp from '../pagination';

const MoviesList = ({ movies, column, paginate }: { movies: any; column?: boolean; paginate?: any }) => {
  const cols = column ? column : 12;
  return (
    <>
      <Grid container spacing={2}>
        {movies?.map((item: any) => (
          <Grid size={{ xs: 6, sm: 3, md: column ? 4 : 2, lg: column ? 3 : 2 }} key={item._id}>
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
                <Box sx={{ maxHeight: '253px', overflow: 'hidden', borderRadius: '8px' }}>
                  <MoviesCard movies={item} />
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
