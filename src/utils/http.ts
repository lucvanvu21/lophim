'use server';
import { revalidateTag } from 'next/cache';

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export const sendRequest = async <T>(method: 'POST' | 'GET' | 'PUT' | 'PATCH' | 'DELETE', url: string, options: any) => {
  try {
    const fullUrl = url.startsWith('/') ? `${backendUrl}${url}` : `${backendUrl}/${url}`;

    const body = options?.body ? JSON.stringify(options.body) : undefined;
    const nextTags = options?.cache ? options.cache : undefined;
    const key = options?.tags ? options.tags : undefined;

    // console.log('key-1', key, '\n---nextTags', nextTags, 'url', url);
    // console.log('fullUrl', fullUrl, '---body', body, '---options', options);
    const baseHeader = {
      'Content-type': 'application/json',
      ...options?.headers,
    };
    // console.log('baseHeader', baseHeader);
    // console.log('fullUrl', fullUrl);
    const y = {
      method,
      headers: baseHeader,
      // cache: 'force-cache',
      ...nextTags,
      body,
    };
    // console.log('y', y);
    const res = await fetch(fullUrl, y);

    if (!res.ok) {
      return res.json().then(function (json) {
        // console.log('json', json);
          return {
          statusCode: res.status,
          message: json?.message ?? '',
          error: json?.error ?? '',
        } as T;
      });
    }
    if (key && ['POST', 'PUT', 'PATCH', 'DELETE'].includes(method)) {
      // console.log('key---1', key);
      revalidateTag(key);
      // console.log('key---2', key);
    }
    return (await res.json()) as T;

    //   .catch(error => {
    //     console.log('error', error);
    //     return {
    //       error: true,
    //       message: 'Lỗi khi lấy dữ liệu',
    //     } as T;
    //   });
    // // console.log('payload', payload);

    // console.log('key---1', key);
    // if (key) {
    //   console.log('key---1', key);
    //   revalidateTag(`${key}`);
    // }
    // return payload;
    // console.log('res', res);
    // const payload: Response = await res.json();
    // if (!res.ok) {
    //   return { error: true, message: payload.message || 'Lỗi khi lấy dữ liệu' };
    // }
    // console.log('payload', payload);
  } catch (error) {
    // console.log('error', error);
    return {
      error: true,
      message: 'Lỗi khi lấy dữ liệu',
    } as T;
  }
};
