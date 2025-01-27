import z from 'zod';
const GenresSchema = z.object({
  _id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid MongoDB ObjectId'),
  // slug: z.string(),
});
const EpisodeItem = z.object({
  name: z.string(),
  slug: z.string(),
  sub: z.string().optional(),
  link: z.string(),
});

// Create Movie Schema
export const CreateMovie = z.object({
  name: z.string().min(1, 'Name is required'),
  engName: z.string().min(1, 'English name is required'),
  imdb: z.string().min(1, 'IMDB is required'),
  tmdb: z.string().min(1, 'TMDB is required'),
  kkslug: z.string().min(1, 'Kkslug is required'),
  nguoncslug: z.string().min(1, 'Nguoncslug is required'),
  ophimslug: z.string().min(1, 'Ophimslug is required'),
  status: z.string().min(1, 'Status is required'),
  content: z.string().min(1, 'Content is required'),
  type: z.enum(['movie', 'series'], { required_error: "Type must be 'movie' or 'series'" }),
  poster_url: z.string().min(1, 'Poster URL is required'),
  thumb_url: z.string().min(1, 'Thumb URL is required'),
  hot: z.boolean(),
  chieurap: z.boolean(),
  trailer_url: z.string().optional(),
  time: z.string().min(1, 'Time is required'),
  episode_current: z.string().min(1, 'Current episode is required'),
  episode_total: z.string().min(1, 'Total episodes are required'),
  season_current: z.string().min(1, 'Current season is required'),
  season_total: z.string().min(1, 'Total seasons are required'),
  quality: z.string().min(1, 'Quality is required'),
  lang: z.string().min(1, 'Language is required'),
  year: z.string(),
  country: z.array(GenresSchema).min(1, 'At least one country is required'),
  genres: z.array(GenresSchema).min(1, 'At least one genre is required'),
  actor: z.array(z.number()).optional(),
  isCompleted: z.boolean(),
});
export type CreateMovieType = z.TypeOf<typeof CreateMovie>;

export const tmdbReq = z.object({
  tmdb: z.string(),
  type: z.enum(['movie', 'tv'], { required_error: "Type must be 'movie' or 'tv'" }),
});
export type tmdbReqType = z.TypeOf<typeof tmdbReq>;
export const addEpiBody = z.object({
  _id: z.string().optional(),
  movieId: z.string(),
  serverName: z.string(),
  serverData: z.array(EpisodeItem).min(1, 'episode data is required'),
});
export type addEpiBodyType = z.TypeOf<typeof addEpiBody>;
