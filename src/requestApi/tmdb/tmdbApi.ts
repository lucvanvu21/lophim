import { tmdbReqType } from '@/types/movieSchema';

export const tmdbApiClient = {
  getDataByTmdbId: async (value: tmdbReqType) => {
    const res = await fetch(`/api/tmdb`, {
      headers: { 'Content-type': 'application/json' },
      method: 'POST',
      body: JSON.stringify(value),
    }).then(res => res.json());

    console.log('----->restmdb', res);
    if (res.success === false) {
      return 'not found';
    }

    // console.log('----->restmdb', res);
    // console.log('----->restmdb', res);
    // console.log('----->restmdb', res);
    // return res
    return {
      movie: {
        engName: res.original_title || res.original_name,
        name: res?.title || res?.name,
        type: value.type === 'movie' ? 'movie' : 'series',
        tmdb: value.tmdb,
        imdb: res.imdb_id,
        content: res.overview || res.tagline,
        poster_url: res.poster_path,
        thumb_url: res.backdrop_path,
        // mediaRate: res.vote_average,
        year: res.release_date || res.first_air_date,
        episode_total: value.type === 'movie' ? '1' : (res.number_of_episodes?.toString() as string),
        season_total: (res.number_of_seasons?.toString() as string) || '1',
        season_current: value.type === 'movie' ? '1' : '',
        episode_current: value.type === 'movie' ? '1' : '',
        time: (res.runtime?.toString() as string) || (res.last_episode_to_air.runtime?.toString() as string),
        // episodes: IEpisode[];
        // genres: res.genres,
        // country: res.origin_country,
        status: res.status,
      },

      seasons: {
        all: res?.seasons?.map(season => ({
          season,
        })),
        res: {
          ...res,
          overview: '...',
        },
      },
    };
  },
  getRate: async (title: string, year: string) => {
    // console.log('---->id:', id);
    // console.log('---->title:', title,year);
    try {
      const rate = await fetch(`https://www.omdbapi.com/?t=${title}&y=${year}&apikey=a332dc0d`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
        },
        cache: 'force-cache',
      });
      const dataRate = await rate.json();
      // console.log('---->dataRate:', dataRate);
      return dataRate?.imdbRating;
    } catch (error) {
      return false;
    }
  },
  getDetailActor: async (id: string) => {
    try {
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
        status: true,
        imdb_id: data?.imdb_id,
        place_of_birth: data?.place_of_birth,
        birthday: data?.birthday,
        biography: data?.biography,
        image: data?.profile_path,
        name: data?.name || data?.also_known_as?.map(item => item).join(', '),
      };
      return dataActor;
    } catch (error) {
      return {
        status: false,
        imdb_id: null,
        place_of_birth: null,
        birthday: null,
        biography: null,
        image: null,
        name: null,
      };
    }
    // console.log('---->res:', data);
  },
};
