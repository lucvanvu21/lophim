import { http } from "./movies";

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

  
};
