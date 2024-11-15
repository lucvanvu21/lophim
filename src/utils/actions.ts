'use client';
import { signIn } from 'next-auth/react';


export const authenticate = async (email: string, password: string) => {
  try {
    const res = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });
    // console.log('--> check email,pass: ', email, password);
    return res;
  } catch (error) {
    throw new Error('Failed to authenticate',error);
  }
};

export const registerUser = async (data: any) => {
  try {
    // console.log('----->check data', data);
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        // Authorization: `Bearer ${session?.access_token}
      },
      body: JSON.stringify(data),
    });

    const user = await res.json();
    // if (!res?.ok) {
    //   console.log(res);
    // }
    return user;
  } catch (error) {}
};
