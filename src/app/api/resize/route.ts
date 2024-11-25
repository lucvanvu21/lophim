import { moviesRequestApi } from '@/requestApi/movies/movies';
import { NextResponse } from 'next/server';
import sharp from 'sharp';
async function resizeImage(imageUrl: string, width: number, height: number) {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    const response = await fetch(`${process.env.NEXT_PUBLIC_IMAGE}${imageUrl}`, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko)',
      },
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const resizedImageBuffer = await sharp(buffer)
      .resize(width, height, {
        // fit: 'cover',
        position: 'center',
      })
      .webp({ quality: 80 }) // Chuyển đổi sang WebP để tối ưu
      .toBuffer();

      // console.log('---->resizedImageBuffer:', resizedImageBuffer);
    // Chuyển buffer thành base64
    return `data:image/webp;base64,${resizedImageBuffer.toString('base64')}`;
  } catch (error) {
    console.error('Error resizing image:', error);
    return imageUrl; // Trả về URL gốc nếu có lỗi
  }
}

export async function GET(request: Request) {
  try {
    // Lấy parameters từ URL
    const { searchParams } = new URL(request.url);
    const imageUrl = searchParams.get('url');
    const width = searchParams.get('width');
    const height = searchParams.get('height');
    const type = searchParams.get('type');
    const page = searchParams.get('page');
    const limit = searchParams.get('limit');
    // console.log('---->type:', type);
    const moviesList = await moviesRequestApi.getAllMoviesForUser(type, Number(page), Number(limit));

    // console.log('---->moviesList:', moviesList?.data?.items);
    // console.log('---->imageUrl:', imageUrl);
    // console.log('---->width:', width);
    // console.log('---->height:', height);
    // if (!imageUrl || !width || !height) {
    //   return NextResponse.json({ message: 'Missing required parameters' }, { status: 400 });
    // }

    // Xử lý resize tất cả ảnh song song
    const moviesWithResizedImages = await Promise.all(
      moviesList?.data?.items.map(async movie => ({
        ...movie,
        imageUrl: await resizeImage(movie.poster_url, 230, 270),
      }))
    );

    // console.log('---->moviesWithResizedImages:', moviesWithResizedImages);
    return NextResponse.json({
      success: true,
      data: moviesWithResizedImages,
    });
  } catch (error) {
    console.error('Error processing image:', error);
    return NextResponse.json({ message: 'Error processing image' }, { status: 500 });
  }
}
