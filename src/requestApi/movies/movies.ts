import { IMovies } from '@/types';
import { http } from '../user/user';
export const moviesRequestApi = {
  countMovies: async () => {
    return http.get('/movies/count', { cache: { next: { tags: ['list-movies'] } } });
  },



  getTopMoviesForUser: async (page: number, limit: number) => {
    return http.get(`/movies/top?page=${page}&limit=${limit}`, { cache: { next: { tags: ['list-movies'] } } });
  },

  getEpisodesBySlug: async (slug: string) => {
    return http.get(`/movies/episodes/${slug}`, { cache: { next: { tags: ['list-movies'] } } });
  },
  getEpisodesForUser: async (id: string, seasons: number) => {
    return http.get(`/episodes/${id}?seasons=${seasons}`, { cache: { cache: 'no-store' } });
  },
  //Admin
  getAllMovies: async (token: any, type: string, page: number, limit: number) => {
    return http.get(`/admin/movies?type=${type}&page=${page}&limit=${limit}`, {
      cache: { next: { tags: ['list-movies'] } },
      headers: { Authorization: `Bearer ${token}` },
    });
  },
  getEpisodes: async (id: string, token: string) => {
    return http.get(`admin/episodes/${id}`, {
      cache: { next: { tags: ['list-episodes'] } },
      headers: { Authorization: `Bearer ${token}` },
    });
  },
  deleteMovies: async (id: string, token: any) => {
    return http.delete(`/admin/movies/${id}`, {
      tags: ['list-movies'],
      headers: { Authorization: `Bearer ${token}` },
    });
  },
  deleteEpisode: async (id: string, token: any) => {
    return http.delete(`/admin/episodes/${id}`, {
      tags: ['list-episodes'],
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  addMovies: async (body: IMovies, token: any) => {
    return http.post(
      `/admin/movies`,
      { body },
      {
        tags: ['list-movies'],
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  },
  addEpisodes: async (body: any, token: any, id: any) => {
    return http.post(
      `/admin/episodes/${id}`,
      { body },
      { tags: ['list-episodes'], headers: { Authorization: `Bearer ${token}` } }
    );
  },
  updateMovies: async (body: IMovies, token: any, id: string) => {
    return http.patch(`/admin/movies/${id}`, { body }, { tags: ['list-movies'], headers: { Authorization: `Bearer ${token}` } });
  },
  updateEpisodes: async (body: any, id: string, token: any) => {
    return http.put(
      `/admin/episodes/${id}`,
      { body },
      { tags: ['list-episodes'], headers: { Authorization: `Bearer ${token}` } }
    );
  },
  //Genres
  getGenres: async (token: string) => {
    return http.get('/admin/genres', {
      cache: { next: { tags: ['list-movies'] } },
      headers: { Authorization: `Bearer ${token}` },
    });
  },
  // getGenresForAdmin: async (token: string) => {
  //   return http.get('/admin/genres', { cache: { next: { tags: ['list-genres'] } } });
  // },

  findComplete: async (page: number, limit: number, token: string) => {
    return http.get(`/admin/movies/find-complete?page=${page}&limit=${limit}`, {
      cache: { next: { tags: ['list-movies'] } },
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  //favorites
  getAllMoviesForUser: async (type?: string, page?: number, limit?: number) => {
    return http.get(`/v1/api/danh-sach/${type}?page=${page}&limit=${limit}`, { cache: { next: { tags: ['list-movies'] } } });
  },
  getMoviesByGenre: async (genre: string, page: number,limit:number, country?: string,) => {
    if (country) {
      return http.get(`/v1/api/quoc-gia/${country}?page=${page}&limit=${limit}`, { cache: { next: { tags: ['list-movies'] } } });
    }
    return http.get(`/v1/api/the-loai/${genre}?page=${page}&limit=${limit}`, { cache: { next: { tags: ['list-movies'] } } });
  },
  getMoviesBySlug: async (slug: string) => {
    return http.get(`/phim/${slug}`, { cache: { next: { tags: ['list-movies'] } } });
  },
  getSearch: async (query: string, page: number, limit: number) => {
    return http.get(`/v1/api/tim-kiem?keyword=${query}&limit=${limit}`, { cache: { next: { tags: ['list-movies'] } } });
  },

  getMoviesUpdateForUser: async (type:string,page: number, limit: number) => {
    return http.get(`/danh-sach/${type}?page=${page}&limit=${limit}`, { cache: { next: { tags: ['list-movies'] } } });
  },
};
