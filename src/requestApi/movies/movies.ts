import { request } from '@/utils/http';
export const moviesRequestApi = {
  //favorites
  getAllMoviesForUser: async (type?: string, page?: number, limit?: number) => {
    // console.log('---->type:', type);
    return http.get(`/v1/api/danh-sach/${type}?page=${page}&limit=${limit}`, { next: { revalidate: 3600 } });
  },
  getMoviesByGenre: async (genre: string, page: number, limit: number, country?: string) => {
    if (country) {
      return http.get(`/v1/api/quoc-gia/${country}?page=${page}&limit=${limit}`, { next: { revalidate: 3600 } });
    }
    return http.get(`/v1/api/the-loai/${genre}?page=${page}&limit=${limit}`, { next: { revalidate: 3600 } });
  },
  getMoviesBySlug: async (slug: string) => {
    return http.get(`/phim/${slug}`, { next: { revalidate: 3600 } });
  },
  getSearch: async (query: string, page: number, limit: number) => {
    return http.get(`/v1/api/tim-kiem?keyword=${query}&limit=${limit}`, { next: { revalidate: 3600 } });
  },

  getMovieNew: async (type: string, page: number, limit: number) => {
    return http.get(`/danh-sach/${type}?page=${page}&limit=${limit}`, { next: { revalidate: 3600 } });
  },
};

export const http = {
  get: async (url: string, options?: any | undefined) => {
    return await request('GET', url, options);
  },
  post: async (url: string, body: any, options?: any | undefined) => {
    // console.log('---->url-post:', body);
    return await request('POST', url, { ...body, ...options });
  },
  put: async (url: string, body?: any, options?: any | undefined) => {
    return await request('PUT', url, { ...body, ...options });
  },
  patch: async (url: string, body?: any, options?: any | undefined) => {
    return await request('PATCH', url, { ...body, ...options });
  },
  delete: async (url: string, body?: any | undefined, options?: any | undefined) => {
    // console.log('---->url-delete:', url);
    return await request('DELETE', url, { ...body, ...options });
  },
};
