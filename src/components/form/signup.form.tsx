'use client';
import {  RegisterBody, RegisterFormType } from '@/schemasValidation/auth.schema';
import { registerUser } from '@/utils/actions';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button,  TextField, Typography } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const SignupForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegisterFormType>({
    resolver: zodResolver(RegisterBody),
  });

  const onSubmit = async (data: RegisterFormType) => {
    const res = await registerUser(data);
    if (res.statusCode === 201) {
      router.push('/signin');
      toast.success('Đăng kí thành công vui lòng đăng nhập');
      reset();
    } else {
      toast.error(res.message);
      reset();
    }
    // console.log(res);
  };
  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        background: ' #06121e',
        padding: 6,
        // paddingX:6, // Thêm khoảng cách bên trong
        borderRadius: 2, // Bo tròn các góc
        boxShadow: 1, // Thêm bóng cho form
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        width: '100%',
        maxWidth: 400, // Đặt chiều rộng tối đa cho form
      }}
    >
      <Typography sx={{ textAlign: 'center', fontSize: '20px' }}>Đăng Ký</Typography>
      <TextField
        id="name"
        label="Name"
        type="name"
        variant="outlined"
        fullWidth
        {...register('name')}
        error={!!errors.name}
        helperText={errors.name?.message ? (errors.name?.message as string) : ''}
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        id="email"
        label="Email"
        type="email"
        variant="outlined"
        fullWidth
        {...register('email')}
        error={!!errors.email}
        helperText={errors.email?.message ? (errors.email?.message as string) : ''}
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        id="password"
        label="Password"
        type="password"
        variant="outlined"
        fullWidth
        {...register('password')}
        error={!!errors.password}
        helperText={errors.password?.message ? (errors.password?.message as string) : ''}
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        id="confirmPassword"
        label="Confirm Password"
        type="password"
        variant="outlined"
        fullWidth
        {...register('confirmPassword')}
        error={!!errors.confirmPassword}
        helperText={errors.confirmPassword?.message ? (errors.confirmPassword?.message as string) : ''}
        InputLabelProps={{ shrink: true }}
      />
      <Button variant="contained" color="primary" fullWidth type="submit">
        Đăng Ký
      </Button>
      <Typography>
        Nếu đã có tài khoản ?{' '}
        <Link href="/signin" style={{ textDecoration: 'underline' }}>
          {' '}
          Đăng nhập ngay
        </Link>
      </Typography>
    </Box>
  );
};

export default SignupForm;
