import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';

import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
// import { Roboto } from 'next/font/google';
import { ThemeProvider } from '@mui/material/styles';
import theme from '@/theme';
import { CssBaseline } from '@mui/material';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import { baseOpenGraph } from './shared-metadata';
// import { Analytics } from '@vercel/analytics/react';
import Script from 'next/script';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});
// const roboto = Roboto({
//   weight: ['300', '400', '500', '700'],
//   subsets: ['vietnamese'],
//   display: 'swap',
//   variable: '--font-roboto',
// });
export const metadata: Metadata = {
  title: {
    template: '%s | lophim.site',
    default: 'Phim hay FullHD Vietsub | Phim lẻ | Phim Bộ',
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://lophim.site'),
  description: 'Phim hay chất lượng cao tại lophim.site với nhiều thể loại phim hấp dẫn và luôn cập nhật những bộ phim mới nhất',
  openGraph: {
    ...baseOpenGraph,
    url: process.env.NEXT_PUBLIC_BASE_URL || 'https://lophim.site',
    images: [
      {
        url: `https://lophim.site/backgroundLogin.jpg`,
        alt: 'Xem phim online chất lượng cao tại lophim.site với nhiều thể loại phim hấp dẫn và luôn cập nhật những bộ phim mới nhất',
      },
    ],
  },
  facebook: {
    appId: '1153863292449405',
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_BASE_URL || 'https://lophim.site',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-QZXHVDDF4D" strategy="afterInteractive"></Script>
        <Script id="google-analytics" strategy="afterInteractive">
          {`
    window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-QZXHVDDF4D');
    `}
        </Script>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {/* <Analytics /> */}
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
