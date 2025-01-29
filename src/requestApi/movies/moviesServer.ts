import { http } from '@/utils/actions';

export const moviesServer = {
  //user
  getMoviesByType: async <T>(category: string, slug: string, page: number = 1, limit: number = 20, search?: string) => {
    const slug1 = slug === undefined ? '' : `/${slug}`;
    return await http.get<T>(`/films/${category}${slug1}?page=${page}&limit=${limit}&keyword=${search}`, {
      // next: { revalidate: 1600 },
      cache: 'no-store',
    });
  },
  getMovieBySlug: async <T>(slug: string) => {
    return await http.get<T>(`/film/${slug}`, { cache: 'no-store' });
  },
  //admin
};
