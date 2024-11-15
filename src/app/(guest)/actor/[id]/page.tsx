import { ActorInfo } from '@/components/actorInfo';
import { tmdbApi } from '@/requestApi/tmdb';
import React from 'react';

const Actor = async ({ params }: { params: { id: string } }) => {
  // console.log('---->params:', params);
  const [actorName,id] = params.id.split('~');
  const name = actorName?.replace(/-/g, ' ').toUpperCase();
  // console.log('---->actorName:', actorName);
  // const actorId = params.id;
  const actorInfo = await tmdbApi.getDetailActor(id);
  // console.log('---->params:', params);
  return (
    <>
      <ActorInfo dataActor={actorInfo} actorName={name} />
    </>
  );
};

export default Actor;
