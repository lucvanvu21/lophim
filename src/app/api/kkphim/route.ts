import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { slug,baseUrl } = body;
    const url = `${baseUrl}${slug}`;

    // console.log('url', url);
    const res = await fetch(url, {
      headers: { 'Content-type': 'application/json' },
    });
    const data = await res.json();
    // console.log('---->dataApiTmdb:', data);
    return NextResponse.json(data);
  } catch (error) {
    console.log('---->error:', error);
    return NextResponse.error();
  }
}
