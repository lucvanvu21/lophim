'use server';
import { revalidateTag } from 'next/cache';
const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export const request = async (method: 'POST' | 'GET' | 'PUT' | 'PATCH' | 'DELETE', url: string, options?: any) => {
  try {
    const body = options?.body ? JSON.stringify(options.body) : undefined;
    // console.log('---->options:', options);
    const nextTags = options?.cache ? options.cache : undefined;
    const key = options?.tags ? options.tags : undefined;
    // console.log('---->tags:', nextTags);
    const baseHeader = {
      'Content-type': 'application/json',
    };
    const fullUrl = url.startsWith('/') ? `${baseUrl}${url}` : `${baseUrl}/${url}`;
    // console.log('---->fullUrl:', fullUrl, '---->body:', body, '--->option:', options);
    const res = await fetch(fullUrl, {
      // ...options,
      headers: {
        ...baseHeader,
        ...options?.headers,
      },
      body,
      ...nextTags,
      method,
    });
    if (key) {
      revalidateTag(`${key}`);
    }
    const payload = await res.json();
    
    // console.log('---->payload:', payload);
    if (!res.ok) {
      // Trả về lỗi mà không gây ra lỗi cho frontend
      return { error: true, message: payload.message || 'Lỗi khi lấy dữ liệu' };
    }
    return payload;
  } catch (error: any) {
    return { error: true, message: error.message || 'Lỗi khi lấy dữ liệu' };
  }
};
