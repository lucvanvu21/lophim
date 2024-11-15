'use client';
import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
// import Select from '@mui/material/Select';
import { CircularProgress, useMediaQuery, useTheme } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useEffect, useRef, useState } from 'react';
import JWPlayer from '@jwplayer/jwplayer-react';
import TopMovies from './topMovies';
import { moviesRequestApiClient } from '@/requestApi/movies/moviesClient';
import { set } from 'lodash';
import { tmdbApiClient } from '@/requestApi/tmdb/tmdbApiClient';

const listServer = [{ name: 'Server 1' }, { name: 'Server 2' }, { name: 'server 3' }];
const IframeMovies = ({ res, tmdb, hot }: { res: any; tmdb: any; hot?: any[] }) => {
  const [activeEpisodeIndex, setActiveEpisodeIndex] = useState<number | null>(0);
  const [activeServer, setActiveServer] = useState<number | null>(0);
  const currentEpisodeUrl = useRef<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [server, setServer] = useState<number>(1);
  const [epiNguonC, setEpiNguonC] = useState<any>(null);

  const episodes = res?.episodes;
  // console.log('---->movies:', movies);
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));
  // const isLargeScreen = '1024px';

  useEffect(() => {
    currentEpisodeUrl.current = episodes[0].server_data[0].link_m3u8;
    setLoading(false);
    // console.log('---->movies:', currentEpisodeUrl);
  }, []);
  // console.log('vtt_blob:', vtt_blob);
  const size = res?.movie?.episode_total > 1 ? 9 : 12;
  // console.log('---->episodes:', size);
  const playlist = [
    {
      file: currentEpisodeUrl.current,
    },
  ];
  const handleServer = async (index: number, slug?: string) => {
    setLoading(true);
    if (index === 1) {
      const res = await tmdbApiClient.getNguonCURL(slug);
      // console.log('---->res:', res);
      if (res.status === 'error') {
        alert('Server đang bảo trì, vui lòng chọn server khác');
        setActiveServer(0);
        setServer(1);
        setLoading(false);
        return;
      }
      currentEpisodeUrl.current = res[0]?.embed;
      setEpiNguonC(res);

      // console.log('---->res:', currentEpisodeUrl);
    } else {
      currentEpisodeUrl.current = episodes[0].server_data[0].link_m3u8;
    }
    setServer(index + 1);
    setLoading(false);
  };
  // console.log('---->playlist:', playlist);
  return (
    <>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, sm: 12, md: 12, lg: size }}>
          {server === 1 && (
            <Box sx={{ height: { md: 'auto', xs: 'auto', lg: 'auto' }, width: { lg: '100%' } }}>
              {loading && (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                  <CircularProgress />
                </Box>
              )}
              {server === 1 && loading == false && currentEpisodeUrl.current && (
                <Box
                  sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <JWPlayer
                    key={currentEpisodeUrl.current}
                    library="https://cdn.jwplayer.com/libraries/1pOrUWNs.js"
                    playlist={playlist}
                    onReady={() => setLoading(false)}
                    // onError={() => setLoading(false)}
                    onLoad={() => setLoading(false)}
                    config={{
                      pipIcon: 'enabled',
                      playbackRateControls: true,
                      displaydescription: true,
                      displaytitle: true,
                      skin: {
                        name: 'myskin',
                      },
                      timeSlider: {
                        legacy: true,
                      },

                      width: isLargeScreen ? '1720px' : '100%',
                      height: isLargeScreen ? 680 : 'auto',
                    }}
                  />
                </Box>
              )}
            </Box>
          )}
          {server === 2 && loading == false && (
            <Box sx={{ height: { xs: '30vh', sm: '50vh', md: '60vh', lg: '80vh' }, width: '100%' }}>
              <iframe
                src={
                  currentEpisodeUrl?.current?.startsWith('https')
                    ? currentEpisodeUrl?.current
                    : `https://example.com/${currentEpisodeUrl.current}`
                }
                allowFullScreen
                onLoad={() => setLoading(false)}
                style={{ border: 'none', height: '100%', width: '100%' }}
              ></iframe>
            </Box>
          )}
          {server === 3 && loading == false && (
            <Box sx={{ height: { xs: '40vh', sm: '50vh', md: '60vh', lg: '80vh' }, width: '100%' }}>
              <iframe
                src={
                  tmdb.type === 'movie'
                    ? `${process.env.NEXT_PUBLIC_SUPEREMBED}?video_id=${tmdb?.id}&tmdb=1`
                    : `${process.env.NEXT_PUBLIC_SUPEREMBED}?video_id=${tmdb?.id}&tmdb=1&s=1&e=1`
                }
                allowFullScreen
                onLoad={() => setLoading(false)}
                style={{ border: 'none', height: '100%', width: '100%' }}
              ></iframe>
            </Box>
          )}
          <Box sx={{ display: 'flex', gap: 2, margin: '0.9rem 0' }}>
            {listServer?.map((item: any, index: number) => (
              <Button
                variant="contained"
                onClick={() => {
                  handleServer(index, res?.movie?.slug);
                  setActiveServer(index);
                  // setLoading(true);
                }}
                color={activeServer === index ? 'primary' : 'inherit'}
                key={item.name}
              >
                {item.name}
              </Button>
            ))}

            {/* <Button
              variant="contained"
              onClick={() => {
                setServer(1);
                setActiveServer(0);
                // setLoading(true);
              }}
              color={activeServer === 0 ? 'primary' : 'inherit'}
            >
              Server 1
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                setServer(2);
                setActiveServer(1);
              }}
              color={activeServer === 1 ? 'primary' : 'inherit'}
            >
              Server 2
            </Button> */}
          </Box>
          {res?.movie.episode_total > 1 && server != 3 && (
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', marginTop: '2rem', marginX: { xs: '0.3rem' } }}>
              <Box sx={{ minWidth: 120, width: '100%' }}>
                <Box>
                  <Typography variant="h6">Danh sách tập phim</Typography>
                  <Grid
                    container
                    spacing={2}
                    sx={{
                      width: '100%',
                      maxHeight: { xs: '30vh', sm: '40vh', md: '60vh' },
                      overflowY: 'auto',
                      overflowX: 'hidden',
                    }}
                  >
                    {server === 1 &&
                      episodes[0].server_data.map((episode: any, index: number) => (
                        <Grid key={episode.slug} size={{ xs: 3, sm: 2, md: 2, lg: 1.5 }}>
                          <Button
                            key={episode.slug}
                            variant="contained"
                            onClick={async () => {
                              // console.log('---->index:', episode);
                              setActiveEpisodeIndex(index);
                              // await changeSub(episode?.subtitle, episode?.url);
                              currentEpisodeUrl.current = episode?.link_m3u8;
                            }}
                            sx={{
                              width: '100%',
                              minWidth: '20px',
                            }}
                            color={activeEpisodeIndex === index ? 'primary' : 'inherit'}
                          >
                            {episode.name}
                          </Button>
                        </Grid>
                      ))}
                    {server === 2 &&
                      epiNguonC?.map((episode: any, index: number) => (
                        <Grid key={episode.slug} size={{ xs: 3, sm: 2, md: 2, lg: 1.5 }}>
                          <Button
                            key={episode.slug}
                            variant="contained"
                            onClick={async () => {
                              // console.log('---->index:', episode);
                              setActiveEpisodeIndex(index);
                              // await changeSub(episode?.subtitle, episode?.url);
                              currentEpisodeUrl.current = episode?.embed;
                            }}
                            sx={{
                              width: '100%',
                              minWidth: '20px',
                            }}
                            color={activeEpisodeIndex === index ? 'primary' : 'inherit'}
                          >
                            {episode.name}
                          </Button>
                        </Grid>
                      ))}
                  </Grid>
                </Box>
              </Box>
            </Box>
          )}
        </Grid>

        {/* <Grid size={12}> */}

        {/* </Grid> */}
        <Grid size={{ xs: 12, lg: 3 }} sx={{ display: { xs: 'none', lg: res?.movie?.episode_total > 1 ? 'block' : 'none' } }}>
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
    </>
  );
};

export default IframeMovies;
