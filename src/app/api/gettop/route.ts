import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url); // Lấy searchParams từ URL
  const day = searchParams.get('period') || 'day'; 
  // console.log('----->req', day);
  // const day = 'day'
  const url = `https://api.muaspinre.com/api/movies/top-movies?period=${day}`;
  try {
    const res = await fetch(url, {
      headers: {
        'Content-type': 'application/json',
      },
    });
    if (!res.ok) {
      throw new Error('error');
    }
    const data = await res.json();
    // console.log('----->data', data);
    return NextResponse.json(data);
  } catch (error) {
    throw new Error(error);
  }
}
