import NextAuth, { DefaultSession } from 'next-auth';
import { JWT } from 'next-auth/jwt';

interface IUser {
  _id: string;
  name: string;
  email: string;
  role: string;
  createdAt: Date;
}
declare module 'next-auth/jwt' {
  interface JWT {
    access_token: string;
    refreshToken: string;
    user: IUser;
    access_expire: number;
    error: string;
  }
}

declare module 'next-auth' {
  interface Session {
    user: IUser;
    access_token: string;
    refreshToken: string;
    role: string;
    access_expire: number;
    error: string;
  }
}
