interface MovieSchemaProps {
  title: string;
  originalTitle?: string;
  description: string;
  posterUrl: string;
  duration: number; // in minutes
  releaseDate: number;
  rating?: number;
  // ratingCount: number;
  // director: string;
  actors?: string[];
  genre?: string[];
}
export function MovieSchema(props: MovieSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Movie',
    name: props.title,
    alternateName: props.originalTitle,
    image: props.posterUrl,
    description: props.description,
    datePublished: props.releaseDate,
    // director: {
    //   '@type': 'Person',
    //   name: props.director
    // },
    actor:
     props.actors && props.actors.length > 0
        ? props.actors?.map(actor => ({
            '@type': 'Person',
            name: actor,
          }))
        : '',
    duration: `PT${props.duration}M`,
    genre: props.genre,
    // aggregateRating: {
    //   '@type': 'AggregateRating',
    //   ratingValue: props.rating,
    //   ratingCount: props.ratingCount,
    //   bestRating: 5
    // }
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}
