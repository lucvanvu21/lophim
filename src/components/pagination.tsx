'use client';
import React from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Pagination, PaginationItem, Stack } from '@mui/material';
import { useRouter } from 'next/navigation';

const PaginationComp = ({ count,currentPage }: { count: number,currentPage:number }) => {
  const router = useRouter();
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    // console.log('---->value:', value);
    router.push(`?page=${value}`);
  };
  return (
    <>
      <Stack spacing={2} sx={{marginTop:5}}>
        <Pagination
          count={count}
          page={currentPage}
           onChange={handleChange} color="primary"
          renderItem={item => <PaginationItem slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }} {...item} />}
        />
      </Stack>
    </>
  );
};

export default PaginationComp;
