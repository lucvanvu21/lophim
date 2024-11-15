import { z } from 'zod';

export const LoginBody = z
  .object({
    email: z.string().email({ message: 'email không hợp lệ' }),
    password: z.string().min(6, { message: 'Mật khẩu ít nhất 6 kí tự' }),
  })
  // .required();

export type LoginFormType = z.infer<typeof LoginBody>;
export const RegisterBody = z
  .object({
    name: z.string(),
    email: z.string().email({ message: 'email không hợp lệ' }),
    password: z.string().min(6, { message: 'Mật khẩu ít nhất 6 kí tự' }),
    confirmPassword: z.string().min(6, { message: 'Mật khẩu ít nhất 6 kí tự' }),
  })
  .strict()
  .refine(data => data.password === data.confirmPassword, {
    message: 'Mật khẩu xác nhận không khớp',
    path: ['confirmPassword'],
  });
// .required();

export type RegisterFormType = z.TypeOf<typeof RegisterBody>;
