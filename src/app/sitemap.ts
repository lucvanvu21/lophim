import { moviesServer } from '@/requestApi/movies/moviesServer';
import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const movie = await moviesServer.getMoviesByType<IModelPaginate<IMovie>>('phim-moi-cap-nhat', undefined, 1, 20);

  // console.log('site map');
  if (movie.status !== 'success') return [];
  const movieSlug = movie.items.map(post => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/phim/${post.slug}`,
    lastModified: post.modified,
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  return [
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/phim-moi-cap-nhat`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/phim-le`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/phim-bo`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    // {
    //   url: `${process.env.NEXT_PUBLIC_BASE_URL}/quoc`,
    //   lastModified: new Date(),
    //   changeFrequency: 'weekly',
    //   priority: 0.8,
    // },

    ...movieSlug.map(item => ({
      ...item,
      changeFrequency: item.changeFrequency as 'never' | 'weekly' | 'yearly' | 'always' | 'hourly' | 'daily' | 'monthly', // Ép kiểu để đảm bảo tính tương thích
    })),
  ];
}
