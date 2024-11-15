'use client';

import { moviesRequestApiClient } from '@/requestApi/movies/moviesClient';
import { tmdbApiClient } from '@/requestApi/tmdb/tmdbApiClient';
import { Box, Button, Typography } from '@mui/material';
import { get } from 'lodash';
import Link from 'next/link';
import { useState } from 'react';

const period = [
  { key: 'day', label: 'Ngày' },
  { key: 'week', label: 'Tuần' },
  { key: 'month', label: 'Tháng' },
];
const TopMovies = ({ hot }: { hot: any }) => {
  // console.log(hot);
  const [data, setData] = useState<any[]>(hot);
  const [active, setActive] = useState<number>(0);
  const handleGetTop = async (key: string) => {
    try {
      const res = await tmdbApiClient.getTop2(key)
      // console.log(res);
    
      setData(res);
    } catch (error) {
      throw new Error(error);
    }
  };
  return (
    <>
      <Box>
        <Box sx={{ alignItems: 'center' }}>
          {period.map((item, index) => (
            <Button
              key={item.key}
              variant="text"
              color={active === index ? 'primary' : 'inherit'}
              sx={{ margin: '0.9rem 0', borderBottom: active === index ? '1px solid #C58560' : '' }}
              onClick={async () => {
                setActive(index);
                await handleGetTop(item.key);
              }}
            >
              {item.label}
            </Button>
          ))}
        </Box>

        {data.map((item: any, index: number) => (
          <Box key={item.slug} sx={{ display: 'flex', gap: 2, marginBottom: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Box
                sx={{
                  minWidth: '30px',
                  display: 'flex',
                  alignItems: 'center',
                  // textAlign: 'center',
                  justifyContent: 'center',
                  borderRadius: '16px',
                  backgroundColor: '#C58560',
                  // maxHeight: '30px',
                  minHeight: '30px',
                  // marginTop: '6px',
                }}
              >
                {index + 1}
              </Box>
            </Box>
            <Box>
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
                {item.view} lượt xem
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </>
  );
};

export default TopMovies;
