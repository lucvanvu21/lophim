import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { day } = body;
    const url = `https://api.muaspinre.com/api/movies/top-movies?period=${day}`;
    const res = await fetch(url, {
      headers: {
        'Content-type': 'application/json',
      },
    });
    // if (!res.ok) {
    //   throw new Error('error');
    // }
    const data = await res.json();
    // console.log('----->data-----api------>', data);
    return NextResponse.json(data);
  } catch (error) {
    throw new Error(error);
  }
}
