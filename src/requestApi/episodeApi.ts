export const getNguonC = async (slug: string, seasons: string) => {
  try {
    const res = await fetch(`https://phim.nguonc.com/api/film/${slug}`, {
      headers: {
        'Content-type': 'application/json',
      },
      cache: 'no-store',
    });
    if (!res.ok) {
      throw new Error('Error');
    }
    const data = await res.json();
    // console.log('---->data:', data.movie.episodes);
    return data?.movie?.episodes[0]?.items?.map((epi: any) => {
      return {
        title: epi.name,
        seasons: seasons,
        episode: epi.name,
        subtitle: '',
        url: epi.embed,
      };
    });

    // console.log('---->data:', data);
  } catch (error) {
    return error;
  }
};
