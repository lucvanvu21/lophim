import sharp from 'sharp';

export async function resizeImage(imageUrl: string, width: number, height: number) {
  try {
    // Tải ảnh từ URL sử dụng fetch
    console.log('---->imageUrl:', imageUrl);
    const response = await fetch(imageUrl);
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Xử lý ảnh với Sharp
    const resizedImageBuffer = await sharp(buffer)
      .resize(width, height, {
        fit: 'cover',
        position: 'center',
      })
      .toBuffer();

    return resizedImageBuffer;
  } catch (error) {
    console.error('Error resizing image:', error);
    throw error;
  }
}
