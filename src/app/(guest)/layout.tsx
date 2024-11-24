import FooterLayout from '@/components/layout/footer';
import Header from '@/components/layout/header';
import { Container } from '@mui/material';
import React from 'react';

const LayoutGuest = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header/>
      <Container maxWidth="xl" sx={{marginTop:'80px'}}>{children}</Container>
      <FooterLayout/>
    </>
  );
};

export default LayoutGuest;
