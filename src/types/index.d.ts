export interface IGenre {
  _id: string;
  name: string;
  slug: string;
}
export interface IEpisode {
  _id: string;
  movieId: string;
  title: string;
  seasons: string;
  episode: string;
  subtitle: string;
  url: string;
}
export interface IMovies {
  _id: string;
  mediaName: string;
  mediaNameVie: string;
  mediaSlug: string;
  mediaType: string;
  mediaTmdbId: string;
  mediaImdbId: string;
  mediaDes: string;
  mediaPoster: string;
  mediaThum: string;
  mediaRate: number;
  mediaYear: number;
  totalEpisodes: number;
  totalSeasons: number;
  isHot: boolean;
  episodes: IEpisode[];
  genres: IGenre[];
  casts: number[];
  country: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface IMoviesPaginate {
  meta: {
    currentPage: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
  result: IMovies[];
}

export {};
declare global {
  interface IRequest {
    url: string;
    method: string;
    body?: { [key: string]: any };
    queryParams?: any;
    useCredentials?: boolean;
    headers?: any;
    nextOption?: any;
  }

  interface IBackendRes<T> {
    error?: string | string[];
    message: string;
    statusCode: number | string;
    data?: T;
  }

  interface IModelPaginate<T> {
    meta: {
      current: number;
      pageSize: number;
      pages: number;
      total: number;
    };
    result: T[];
  }
  interface ILogin {
    user: {
      _id: string;
      name: string;
      email: string;
    };
    access_token: string;
  }
}
