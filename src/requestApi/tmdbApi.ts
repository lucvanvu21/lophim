export const getActors = async (id: string, type: string, season?: string) => {
  try {
    const mediaType = type === 'movie' ? 'movie' : 'tv';

    const url =
      mediaType === 'movie'
        ? `https://api.themoviedb.org/3/${mediaType}/${id}/credits?language=en-US`
        : `https://api.themoviedb.org/3/${mediaType}/${id}/season/${season}/credits?language=en-US`;
        // console.log('url', url);
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
      },
    });
    const actors = await res.json();
    // console.log('actors', actors);
    // return actors;
    return actors?.cast?.slice(0, 30)?.map(item => {
      return {
        // me:id,
        actorName: item?.name,
        character: item?.character,
        actorPoster: `https://image.tmdb.org/t/p/w92/${item.profile_path}`,
        _id: item?.id,
        actorId: item?.id,
      };
    });
  } catch (error) {
    return error;
  }
};
