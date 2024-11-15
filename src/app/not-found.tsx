import { Box, Typography } from '@mui/material';
import Link from 'next/link';
import React from 'react';

const NotFound = () => {
  return (
    <Box sx={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center',gap:2 }}>
        <Typography variant="h2" fontWeight={700}>
          404
        </Typography>
        <Typography variant="h4" fontWeight={500}>
          Trang không tồn tại
        </Typography>
        <Link href="/">Quay lại trang chủ</Link>
      </Box>
    </Box>
  );
};

export default NotFound;
