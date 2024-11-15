export const tmdbApiClient = {
  getDataByTmdbId: async (value: any) => {
    const res = await fetch(`/api/tmdb`, {
      headers: { 'Content-type': 'application/json' },
      method: 'POST',
      body: JSON.stringify(value),
    }).then(res => res.json());

    if (res.status_code == 6) {
      return 'not found';
    }

    // console.log('----->restmdb', res);
    // console.log('----->restmdb', res);
    // console.log('----->restmdb', res);
    // return res
    return {
      mediaName: res.original_title || res.original_name,
      mediaNameVie: res?.title || res?.name,
      mediaType: value.type === 'movie' ? 'movies' : 'tv',
      mediaTmdbId: value.tmdbId,
      mediaImdbId: res.imdb_id,
      mediaDes: res.overview || res.tagline,
      mediaPoster: res.poster_path,
      mediaThum: res.backdrop_path,
      mediaRate: res.vote_average,
      mediaYear: res.release_date || res.first_air_date,
      totalEpisodes: value.type === 'movie' ? 1 : res.number_of_episodes,
      totalSeasons: res.number_of_seasons || 1,
      // episodes: IEpisode[];
      theloai: res.genres,
      country: res.origin_country.map((item: any) => item).join(', '),
    };
  },

  getNguonCURL: async (slug: string) => {
    const res = await fetch(`/api/get-nguon-c?slug=${slug}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    // console.log('----->res', res);
    const data = await res.json();
    // console.log('----->data', data);
    if (data.status === 'error') {
      return data;
    }
    const list = data?.movie?.episodes.map(item => {
      if (item.server_name.includes('Vietsub')) {
        return item?.items;
      }
      // return null;
    });
    // console.log('----->list', list);
    return list[0];
  },
  getTop2: async (day: string) => {
    try {
      const res = await fetch(`https://api.muaspinre.com/api/movies/top-movies?period=${day}`, {
        headers: {
          'Content-type': 'application/json',
        },
      });
      if (!res.ok) {
        throw new Error('error');
      }
      const data = await res.json();
      return data;
    } catch (error) {
      throw new Error(error);
    }
  },
};
