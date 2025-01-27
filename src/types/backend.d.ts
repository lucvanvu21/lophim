export {};

declare global {
  interface IPaginate {
    current_page: number;
    items_per_page: number;
    total_page: number;
    total_items: number;
  }
  interface IModelPaginate<T> {
    error?: string | string[];
    status: number | string;
    msg: string;
    paginate: IPaginate;
    cat: {
      name: string;
      title: string;
      slug: string;
    };
    items: T[];
  }
  interface IMovieResponse<T> {
    status: string;
    movie: T;
  }

  interface IMovie {
    id: string;
    name: string;
    slug: string;
    original_name: string;
    thumb_url: string;
    poster_url: string;
    created: string; // ISO date string
    modified: string; // ISO date string
    description: string;
    total_episodes: number;
    current_episode: string;
    time: string;
    quality: string;
    language: string;
    director: string;
    casts: string;
    category: Record<string, ICategoryGroup>;
    episodes: IEpisode[];
  }

  interface ICategoryGroup {
    group: {
      id: string;
      name: string;
    };
    list: ICategory[];
  }

  interface ICategory {
    id: string;
    name: string;
  }

  interface IEpisode {
    server_name: string;
    items: IEpisodeItem[];
  }

  interface IEpisodeItem {
    name: string;
    slug: string;
    embed: string;
    m3u8: string;
  }
}
