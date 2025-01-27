export const getKKPhim = async (slug: string) => {
  const baseUrl = 'https://phimapi.com/phim/';
  const res = await fetch(`/api/kkphim`, {
    headers: { 'Content-type': 'application/json' },
    method: 'POST',
    body: JSON.stringify({ slug, baseUrl }),
  }).then(res => res.json());
  return res;
};
export const getNguonC = async (slug: string) => {
  const baseUrl = 'https://phim.nguonc.com/api/film/';
  const res = await fetch(`/api/kkphim`, {
    headers: { 'Content-type': 'application/json' },
    method: 'POST',
    body: JSON.stringify({ slug, baseUrl }),
  }).then(res => res.json());
  return res;
};
