import { Box } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Box sx={{ position: 'relative', height: '100vh' }}>
        <Box
          sx={{
            position: 'absolute',
            width: '100vw',
            height: '100vh',
          }}
        >
          <Image
            src="/backgroundLogin.jpg"
            alt="lophim.site"
            sizes="100vw"
            quality={30}
            width={80}
            height={70}
            loading="lazy"
            style={{
              width: '100%',
              height: '99vh',
              objectFit: 'cover',
              zIndex: -1, // Đặt zIndex ở đây nếu cần
            }}
            // unoptimized
          />
          <Box
            sx={{
              position: 'absolute',
              width: '100vw',
              height: '100vh',
              backgroundColor: 'rgba(0,0,0,0.5)',
              zIndex: 1,
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            }}
          ></Box>
        </Box>

        <Box
          sx={{
            position: 'absolute',
            height: '100%',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 10,
          }}
        >
          <ToastContainer autoClose={1500} position="bottom-right" />

          {children}
        </Box>
      </Box>

      {/* <ToastContainer /> */}
    </>
  );
};

export default AuthLayout;
