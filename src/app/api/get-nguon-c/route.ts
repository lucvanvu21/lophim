import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url); // Lấy searchParams từ URL
  const slug = searchParams.get('slug')
  // console.log('----->req', slug);
  // const slug = 'slug'
  const url = `https://phim.nguonc.com/api/film/${slug}`;
  try {
    const res = await fetch(url, {
      headers: {
        'Content-type': 'application/json',
      },
    });
    // if (!res.ok) {
    //   return NextResponse.json({ message: 'Failed to fetch top movies' }, { status: 500 });
    // }
    // console.log('----->res', res);
    const data = await res.json();
    // console.log('----->data', data);
    return NextResponse.json(data);
  } catch (error) {
    throw new Error(error);
  }
}
