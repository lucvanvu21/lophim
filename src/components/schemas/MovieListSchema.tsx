// components/schemas/MovieListSchema.tsx
interface Movie {
  name: string;
  url: string;
  image: string;
}

interface MovieListSchemaProps {
  title: string;
  movies: Movie[];
}

export function MovieListSchema({ title, movies }: MovieListSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: title,
    itemListElement:
      movies && movies.length > 0
        ? movies.map((movie, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            item: {
              '@type': 'Movie',
              name: movie.name,
              url: movie.url,
              image: movie.image,
            },
          }))
        : [],
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}
