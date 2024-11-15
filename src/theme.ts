'use client';
import { purple } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      // main: '#f7bc44',
      main: '#df7a5e',
      contrastText: '#ffffff',
    },
    secondary: {
      main: purple[300],
    },
    background: {
      default: '#0c1824',
      paper: '#0c1824', // Màu nền cho dark mode
      // paper: '#292838', // Màu nền của các thẻ Card hoặc các thành phần khác
    },
    text: {
      primary: '#fff',
      secondary: '#fff',
    },
  },
  typography: {
    // fontFamily: 'sans-serif',
    fontWeightBold: 500,
    button: {
      fontWeight: 600, // Đặt độ dày của chữ trong nút toàn cục
    },
  },
});

export default theme;
