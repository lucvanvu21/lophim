import type { Metadata } from 'next';
import { Inter, Roboto_Mono } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { baseOpenGraph } from './share-meta';
import Script from 'next/script';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import ProvidersLoading from '@/components/loadingProvider';
// import NextNProgress from 'nextjs-progressbar';
const geistSans = Inter({
  variable: '--font-geist-sans',
  subsets: ['vietnamese'],
});

const geistMono = Roboto_Mono({
  variable: '--font-geist-mono',
  subsets: ['vietnamese'],
});

export const metadata: Metadata = {
  title: {
    template: '%s | lophim',
    default: 'Lò phim -Phim hay cả lò - Xem phim chất lượng cao',
  },
  description:
    'lophim -xem phim mới nhất cập nhật liên tục nhiều thể loại , phim chiếu rạp, phim hành động, phim kinh dị, phim hài, phim hoạt hình, phim bộ hay nhất, phim lẻ hay nhất, phim chiếu rạp mới nhất',
  keywords: [
    'lophim',
    'lò phim',
    'phim hay',
    'Phim Trung Quốc',
    'Phim Hàn Quốc',
    'Phim chiếu rạp',
    'Phim hành động',
    'Phim kinh di',
    'Phim hài',
    'Phim hoạt hình',
    'Phim bộ hay nhất',
    'Xem phim Online',
  ],
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://lophim.site'),
  openGraph: {
    ...baseOpenGraph,
    title: 'LoPhim - Xem phim chất lượng cao',
    description: 'Xem phim chất lượng cao tại lophim.site với hàng nghìn bộ phim mới nhất, chất lượng cao nhất Full HD, 4K',
    url: process.env.NEXT_PUBLIC_BASE_URL || 'https://lophim.site',
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/bg.jpg`,
        alt: 'Xem phim chất lượng cao tại lophim.site',
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
    <html lang="vi">
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
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Toaster />
        <Analytics />
        <SpeedInsights />
        {/* <NextNProgress color="#bd1c0e" height={4} /> */}
        <ProvidersLoading>{children}</ProvidersLoading>
      </body>
    </html>
  );
}
