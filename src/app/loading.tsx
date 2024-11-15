'use client'
import React, { useEffect, useState } from 'react';
import { LinearProgress, Box } from '@mui/material';

const TopLoadingBar = () => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prevProgress) => (prevProgress >= 100 ? 100 : prevProgress + 30));
        }, 30);

        return () => clearInterval(timer);
    }, []);
    return (
        <Box
            sx={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 1000,
            }}
        >
            <LinearProgress variant="determinate" value={progress} />
        </Box>
    );
};

export default TopLoadingBar;
