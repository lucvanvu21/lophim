'use client';
import { moviesRequestApiClient } from '@/requestApi/movies/moviesClient';
import { Box, Button, FormControlLabel, Modal, Switch, TextField, Typography } from '@mui/material';
import React, { use, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

export const EditGenres = props => {
  const { open, setOpen, genres, token } = props;
  // console.log('---->genres:', genres);
  const {
    handleSubmit: handleSubmit,
    register: register,
    reset: reset,
    formState: { errors },
    control,
    // formState: { error};
    //  },
  } = useForm<any>();
  useEffect(() => {
    if (genres) {
      reset(genres); // Chỉ reset khi genres có giá trị
    }
  }, [genres]);
  const onSubmit = async (data: any) => {
    // console.log('data---->',data);
    console.log(data);
    const body = {
      name: data.name,
      slug: data.slug,
      status: data.status,
    };
    if (genres) {
      const res = await moviesRequestApiClient.updateGenres(body, genres._id, token);
      if (res.statusCode === 200) {
        setOpen(false);
        toast.success('Cập nhật thành công');
      } else {
        toast.error('Cập nhật thất bại: ' + (res.message || 'Có lỗi xảy ra.'));
      }
    } else {
      const res = await moviesRequestApiClient.addGenres(body, token);
      // console.log('---->res:', res);
      if (res.statusCode === 201) {
        setOpen(false);
        toast.success('Tạo mới thành công');
      } else {
        toast.error('Tạo mới thất bại' + (res.message || 'Có lỗi xảy ra.'));
      }
      // console.log('---->res:', res);
    }
  };
  return (
    <>
      <Modal open={open} onClose={() => setOpen(false)} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
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
          <Typography sx={{ textAlign: 'center', fontSize: '20px' }}>Edit</Typography>
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
            id="slug"
            label="Slug"
            type="slug"
            variant="outlined"
            fullWidth
            {...register('slug')}
            error={!!errors.slug}
            helperText={errors.slug?.message ? (errors.slug?.message as string) : ''}
            InputLabelProps={{ shrink: true }}
          />
          <Controller
            name="status"
            control={control}
            render={({ field: { onChange, value } }) => (
              <FormControlLabel control={<Switch checked={value} onChange={onChange} />} label="Trạng thái" />
            )}
          />

          <Button variant="contained" color="primary" fullWidth type="submit">
            Lưu thay đổi
          </Button>
        </Box>
      </Modal>
    </>
  );
};
