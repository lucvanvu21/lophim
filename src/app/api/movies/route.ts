import { moviesServer } from '@/requestApi/movies/moviesServer';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url); // Lấy searchParams từ URL
  const cate1 = searchParams.get('cate1') || '';
  const slug = searchParams.get('slug') || '';
  const page = parseInt(searchParams.get('page') || '1');
  const keyword = searchParams.get('keyword') || '';
  // console.log('----->req', slug);
  // const slug = 'slug'
  // const url = `https://phim.nguonc.com/api/films/${slug}`;
  try {
    const res = await moviesServer.getMoviesByType(cate1, slug, page, 20, keyword);

    return NextResponse.json(res);
  } catch (error) {
    throw new Error(error);
  }
}
