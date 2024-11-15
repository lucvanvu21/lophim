import { authOptions } from '@/utils/authOptions';
import { request } from '@/utils/http';
import { getServerSession } from 'next-auth';
// import { getAccessToken } from '@/utils/getToken';

export const getAccessToken = async () => {
  const session: any = await getServerSession(authOptions);
  return session?.access_token || null;
};
export const userRequestApi = {
  getAllUsers: async () => {
    const token = await getAccessToken();

    return http.get('/user', { cache: { next: { tags: ['list-users'] } }, headers: { Authorization: `Bearer ${token}` } });
  },
  deleteUser: async (id: string, token: any) => {
    return http.delete(`/user/${id}`, { tags: 'list-users', headers: { Authorization: `Bearer ${token}` } });
  },
  addUser: async (body: any, token: any) => {
    // const token = await getAccessToken();
    return http.post('/user', { body }, {tags: 'list-users', headers: { Authorization: `Bearer ${token}` } });
  },
};

export const http = {
  get: async (url: string, options?: any | undefined) => {
    return await request('GET', url, options);
  },
  post: async (url: string, body: any, options?: any | undefined) => {
    // console.log('---->url-post:', body);
    return await request('POST', url, { ...body, ...options });
  },
  put: async (url: string, body?: any, options?: any | undefined) => {
    return await request('PUT', url, { ...body, ...options });
  },
  patch: async (url: string, body?: any, options?: any | undefined) => {
    return await request('PATCH', url, { ...body, ...options });
  },
  delete: async (url: string, body?: any | undefined, options?: any | undefined) => {
    // console.log('---->url-delete:', url);
    return await request('DELETE', url, { ...body, ...options });
  },
};
