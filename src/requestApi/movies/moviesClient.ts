import { http } from '../user/user';

export const moviesRequestApiClient = {
  deleteGenres: async (id: string, token: string) => {
    return http.delete(`/admin/genres/${id}`, { tags: ['list-genres'], headers: { Authorization: `Bearer ${token}` } });
  },
  addGenres: async (body: any, token: any) => {
    return http.post('/admin/genres', { body }, { tags: ['list-genres'], headers: { Authorization: `Bearer ${token}` } });
  },
  updateGenres: async (body: any, id: string, token: string) => {
    return http.patch(`/admin/genres/${id}`, { body }, { tags: ['list-genres'], headers: { Authorization: `Bearer ${token}` } });
  },
  getEpisodeCount: async (tvId: string) => {
    return http.get(`/movies/count-epi?tv=${tvId}`, { cache: { next: { tags: ['list-episodes'] } } });
  },

  ///bookmark
  addFavorites: async (body: any, token: string) => {
    return http.post('/favorites', { body }, { tags: ['list-fav'], headers: { Authorization: `Bearer ${token}` } });
  },
  getFavorites: async (token: string, page?: number, limit?: number) => {
    return http.get(`/favorites?page=${page}&limit=${limit}`, {
      cache: { next: { tags: ['list-fav'] } },
      headers: { Authorization: `Bearer ${token}` },
    });
  },
  findFavorites: async (movieId: any, token: string) => {
    return http.get(`/favorites/${movieId}`, { tags: ['list-fav'], headers: { Authorization: `Bearer ${token}` } });
  },
  removeFavorites: async (movieId: any, token: string) => {
    return http.delete(`/favorites/${movieId}`, { tags: ['list-fav'], headers: { Authorization: `Bearer ${token}` } });
  },

  getTop: async (day: string) => {
    try {
      let url: string;
      if (process.env.NODE_ENV === 'development') {
        url = `http://localhost:3000`;
      } else {
        url = `${process.env.NEXT_PUBLIC_BASE_URL}`;
      }
      // console.log('----->url', url);
      const res = await fetch(`${url}/api/gettop?period=${day}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        throw new Error('Failed to fetch top movies');
      }

      const data = await res.json();
      // console.log('----->data', data);
      return data;
    } catch (error) {
      console.error('Fetch error:', error);
      throw new Error(error.message);
    }
  },
  getNguonC: async (slug: string) => {
    try {
      let url: string;
      if (process.env.NODE_ENV === 'development') {
        url = `http://localhost:3000`;
      } else {
        url = `${process.env.NEXT_PUBLIC_BASE_URL}`;
      }
      const res = await fetch(`${url}/api/get-nguon-c?slug=${slug}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // console.log('----->res', res);
      const data = await res.json();
      // console.log('----->data', data);
     if(data.status === 'error'){
      return data
     }
     const list = data?.movie?.episodes.map(item => {
      if (item.server_name.includes('Vietsub')) {
        return item.items;
      }
    });
    // console.log('----->list', list);
    return list[0];
    } catch (error) {
      throw new Error(error.message);
    }
  },
};
