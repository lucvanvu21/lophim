'use client';
import { Box, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import Image from 'next/image';
import React from 'react';

export const ActorInfo = ({ dataActor, actorName }: { dataActor: any; actorName: string }) => {
  return (
    <>
      <Grid container columnSpacing={5} sx={{ marginTop: '5rem' }}>
        <Grid size={{ xs: 12, sm: 4 }}>
          <Image
            // loader={`https://image.tmdb.org/t/p/w300_and_h450_bestv2`}
            src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2${dataActor?.image}` || 'https://i.imgur.com/o8AhA0H.png'}
            alt={actorName || 'actor name'}
            loading="lazy"
            placeholder="blur"
            blurDataURL="data:image/svg+xml;base64,..."
            sizes="80vw"
            quality={50}
            style={{
              width: '100%',
              height: 'auto',
              // transition: 'transform 0.3s ease',
            }}
            width={40}
            height={50}
            // unoptimized
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 8 }} rowSpacing={5}>
          <Typography variant="h4" component={'h1'}>
            {actorName}
          </Typography>

          <Box>
            <Typography variant="h6">Ngày sinh</Typography>
            <Typography color="#ddd">{dataActor?.birthday}</Typography>
          </Box>
          <Box>
            <Typography variant="h6">Nơi sinh</Typography>
            <Typography color="#ddd">{dataActor?.place_of_birth}</Typography>
          </Box>

          {dataActor.biography && (
            <Box>
              <Typography variant="h6">Tiểu sử</Typography>
              <Typography color="#ddd">{dataActor?.biography}</Typography>
            </Box>
          )}
        </Grid>
      </Grid>
    </>
  );
};
