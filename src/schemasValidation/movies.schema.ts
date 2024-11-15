import { z } from 'zod';

export const MoviesBody = z.object({
  mediaName: z.string().min(1, 'Không được để trống'),

  mediaNameVie: z.string().min(1, 'Không được để trống'),

  mediaSlug: z.string().min(1, 'Không được để trống'),

  mediaType: z.string().min(1, 'Không được để trống'),

  mediaTmdbId: z.string().min(1, 'Không được để trống'),

  mediaImdbId: z.string().min(1, 'Không được để trống'),

  mediaDes: z.string().min(1, 'Không được để trống'),

  mediaPoster: z.string().min(1, 'Không được để trống'),

  mediaThum: z.string().min(1, 'Không được để trống'),

  episodes: z
    .array(
      z.object({
        title: z.string().min(1, 'Không được để trống'),
        seasons: z.preprocess(val => Number(val), z.number().min(1, 'Không được để trống')),
        episode: z.preprocess(val => Number(val), z.number().min(1, 'Không được để trống')),
        subtitle: z.string().optional(),
        url: z.string().min(1, 'Không được để trống'),
      })
    )
    .optional(),
  genres: z.array(z.string().optional()),

  // mediaRate: z.string(),
  country: z.string().min(1, 'Không được để trống'),

  mediaYear: z.string().min(1, 'Không được để trống'),

  mediaRate: z.preprocess(val => Number(val), z.number().min(0).max(10)),
  totalSeasons: z.preprocess(val => Number(val), z.number().min(1, 'Không được để trống')),
  totalEpisodes: z.preprocess(val => Number(val), z.number().min(1, 'Không được để trống')),
  isHot: z.boolean(),
});

export type MoviesBodyType = z.infer<typeof MoviesBody>;

export const TmdbBody = z.object({
  tmdbId: z.string().min(1, 'Không được để trống'),
  type: z.string().min(1, 'Không được để trống'),
});
export const Episode = z.object({
  slug: z.string().min(1, 'Không được để trống'),
  apisrc: z.string().min(1, 'Không được để trống'),
  seasons: z.string().min(1, 'Không được để trống'),
});
