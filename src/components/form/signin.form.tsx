'use client';
import { LoginBody, LoginFormType } from '@/schemasValidation/auth.schema';
import { authenticate } from '@/utils/actions';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const SignInForm = () => {
  const router = useRouter();
  // const { data: session } = useSession();
  // console.log('--->check sesion login:', session);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    // getValues,
  } = useForm<LoginFormType>({
    resolver: zodResolver(LoginBody),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword(show => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const onSubmit = async (data: LoginFormType) => {
    const res = await authenticate(data.email, data.password);
    // console.log('data:', res);

    if (res?.error) {
      toast.error(res.error, {
        position: 'top-right',
      });
      reset();
      return;
    } else {
        router.push('/admin/dashboard');
      }

      // router.push('/');
    // }
    reset();
  };
  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        background: ' #06121e',
        padding: 6, // Thêm khoảng cách bên trong
        borderRadius: 2, // Bo tròn các góc
        boxShadow: 1, // Thêm bóng cho form
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        width: '100%',
        maxWidth: 400, // Đặt chiều rộng tối đa cho form
      }}
    >
      <Typography sx={{ textAlign: 'center', fontSize: '20px' }}>Đăng Nhập</Typography>

      <TextField
        label="Email"
        // defaultValue={''}
        {...register('email', { required: 'Email không được để trống' })}
        error={!!errors.email}
        helperText={errors.email?.message}
        fullWidth
        InputLabelProps={{ shrink: true }}
        margin="normal"
      />
      <TextField
        // id="outlined-uncontrolled"
        // sx={{color:'#ddd'}}
        label="Password"
        fullWidth
        type={showPassword ? 'text' : 'password'}
        {...register('password', { required: 'Password không được để trống' })}
        error={!!errors.password}
        helperText={errors.password?.message ? (errors.password?.message as string) : ''}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                onMouseUp={handleMouseUpPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        InputLabelProps={{ shrink: true }}
        // InputLabelProps={{
        //   shrink: false, // Nhãn chỉ nhảy lên khi có lỗi hoặc có giá trị
        // }}
      ></TextField>

      <Button variant="contained" color="primary" fullWidth type="submit">
        Đăng Nhập
      </Button>
      <Typography>
        Nếu chưa có tài khoản ?{' '}
        <Link href="/signup" style={{ textDecoration: 'underline' }}>
          {' '}
          Đăng ký ngay
        </Link>
      </Typography>
      <Typography>
        <Link href="/" style={{ textDecoration: 'underline' }}>
          Quay lại trang chủ
        </Link>
      </Typography>
    </Box>
  );
};

export default SignInForm;
