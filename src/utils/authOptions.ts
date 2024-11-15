import CredentialsProvider from 'next-auth/providers/credentials';
import { jwtDecode } from 'jwt-decode';
import { AuthOptions } from 'next-auth';

const refreshAccessToken = async (token: any) => {
  try {
    const refreshToken = token.refreshToken;
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/refresh-token`, {
      headers: { 'Content-type': 'application/json', Authorization: `Bearer ${token.access_token}` },
      credentials: 'include',
      method: 'POST',
      body: JSON.stringify({ refreshToken }),
    });
    if (!res.ok) {
      throw new Error('Failed to refresh access token');
    }

    const data = await res.json();
    return {
      ...token,
      access_token: data.data.access_token,
      access_token_expiry: (jwtDecode(data.data.access_token) as any).exp,
    };
  } catch (error) {
    return {
      ...token,
      error: 'RefreshAccessTokenError',
    };
  }
};

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        if (typeof credentials !== 'undefined') {
          // console.log('-<<<< cre', credentials);
          const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
              username: credentials.email,
              password: credentials.password,
            }),
          })
            .then(async data => await data.json())
            .catch(error => {
              throw new Error('Internal server',error);
            });

          if (res.statusCode === 201) {
            return {
              access_token: res.data.access_token,
              refreshToken: res.data.refreshToken,
              ...res.data.user,
            };
          } else if (res?.statusCode === 401) {
            throw new Error('Tài khoản hoặc mật khẩu không chính xác!');
          } else {
            throw new Error('Lỗi đăng nhập!');
          }
        } else {
          return null;
        }
      },
    }),
  ],

  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  pages: {
    signIn: '/signin',
  },

  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.access_token = user.access_token; // Lưu access_token từ user
        token._id = user._id; // Lưu thông tin người dùng từ user
        token.name = user.name; // Lưu thông tin người dùng từ user
        token.email = user.email; // Lưu thông tin người dùng từ user
        token.role = user.role; // Lưu thông tin người dùng từ user
        token.refreshToken = user.refreshToken;
        token.access_token_expiry = (jwtDecode(user.access_token) as any).exp;
      }
      if (token.access_token_expiry && Date.now() / 1000 < Number(token.access_token_expiry)) {
        const shouldTime = await Math.round(token.access_token_expiry - 2 * 60 - Date.now() / 1000);
        // console.log('---->should time:', shouldTime);
        if (shouldTime > 0) {
          return Promise.resolve(token);
        }
        token = await refreshAccessToken(token);
        return Promise.resolve(token);
      } else {
        return {
          ...token,
          error: 'AccessTokenError',
        };
      }
    },
    async session({ session, token }: any) {
      session.access_token = token.access_token; // Truyền access_token vào session
      session._id = token._id; // Truyền thông tin người dùng vào session
      session.email = token.email; // Truyền thông tin người dùng vào session
      session.name = token.name; // Truyền thông tin người dùng vào session
      session.role = token.role; // Truyền thông tin người dùng vào session
      session.access_token_expiry = token.access_token_expiry;
      return {
        ...session,
        error: token.error,
      };
    },
  },
};