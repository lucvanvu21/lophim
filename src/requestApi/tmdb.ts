export const tmdbApi = {
  getActor: async (type: string, id: string) => {
    const mediaType = type === 'tv' ? 'tv' : 'movie';

    const actors = await fetch(`https://api.themoviedb.org/3/${mediaType}/${id}/credits?language=en-US`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
      },
    });
    const dataActor = await actors.json();
    // console.log('---->dataActor:', dataActor);
    return dataActor?.cast?.map((item: any) => {
      return {
        // me:id,
        actorName: item?.name,
        character: item?.character,
        actorPoster: `https://image.tmdb.org/t/p/w154/${item.profile_path}`,
        _id: item?.id,
        actorId: item?.id,
      };
    });
  },
  getRateEpisode: async (id: string) => {
    try {
      const rate = await fetch(`https://seriesgraph.com/api/shows/${id}/season-ratings`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
        },
      });
      const dataRate = await rate.json();
      return dataRate;
    } catch (error) {
      return false
    }
  },
  getRate: async (id: string) => {
    // console.log('---->id:', id);
    try {
      const rate = await fetch(`https://www.omdbapi.com/?i=${id}&apikey=a332dc0d`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
        },
      });
      const dataRate = await rate.json();
      // console.log('---->dataRate:', dataRate);
      return dataRate?.imdbRating;
    } catch (error) {
      return false;
    }
  },
  getDetailActor: async (id: string) => {
    const res = await fetch(`https://api.themoviedb.org/3/person/${id}?language=vi-VN`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
      },
    });
    const data = await res.json();
    // console.log('---->data:', data);
    const dataActor = {
      imdb_id: data?.imdb_id,
      place_of_birth: data?.place_of_birth,
      birthday: data?.birthday,
      biography: data?.biography,
      image: data?.profile_path,
      name : data?.name || data?.also_known_as?.map((item: any) => item).join(', '),
    }
    return dataActor;
    // console.log('---->res:', data);
  },
};
