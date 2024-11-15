'use client';
import { moviesRequestApiClient } from '@/requestApi/movies/moviesClient';
import { Box, Typography } from '@mui/material';
import { useEffect, useRef, useState } from 'react';

const CACHE_DURATION = 3 * 60 * 1000;

const CountEpisodes = ({ tvId }: { tvId: string }) => {
  const [res, setRes] = useState<any>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const fetchEpisodeCount = async () => {
    try {
      const response = await moviesRequestApiClient.getEpisodeCount(tvId);
      setRes(response);

      sessionStorage.setItem(tvId, JSON.stringify(response));
      sessionStorage.setItem(`${tvId}-time`, Date.now().toString());
    } catch (error) {
      console.error('Error fetching episode count:', error);
    }
  };

  useEffect(() => {
    const getEpisodeCount = async () => {
      const cachedData = sessionStorage.getItem(tvId);
      const cacheTime = sessionStorage.getItem(`${tvId}-time`);
      if (cachedData && cacheTime) {
        const timeDiff = Date.now() - parseInt(cacheTime, 10);

        if (timeDiff < CACHE_DURATION) {
          setRes(JSON?.parse(cachedData));

          const timeRemaining = CACHE_DURATION - timeDiff;
          timerRef.current = setTimeout(fetchEpisodeCount, timeRemaining);
          return;
        }
      }

      await fetchEpisodeCount();

      timerRef.current = setTimeout(fetchEpisodeCount, CACHE_DURATION);
    };

    getEpisodeCount();

    // Cleanup function
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [tvId]);

  return (
    <>
      <Box>
        {Array.isArray(res?.data) ? (
          res?.data?.map((item: any, index: number) => (
            <Box key={`S-${index}`} sx={{ display: 'flex', gap: 2 }}>
              <Typography color="warning">S{index + 1}: </Typography>
              <Typography color="primary" sx={{ fontWeight: '700' }}>
                Số tập {item}
              </Typography>
            </Box>
          ))
        ) : (
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Typography color="warning">Mùa 1: </Typography>
            <Typography color="primary" sx={{ fontWeight: '700' }}>
              Số tập {res?.data}
            </Typography>
          </Box>
        )}
      </Box>
    </>
  );
};

export default CountEpisodes;
