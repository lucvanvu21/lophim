import type { Metadata } from 'next';
import { Inter, Roboto_Mono } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { baseOpenGraph } from './share-meta';
import Script from 'next/script';
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
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
    default: 'Phim tốc độ | Phim Mới | Phim HD | Xem phim nhanh | Phim VietSub ',
  },
  description:
    'lophim - Website xem phim trực tuyến chất lượng cao, cập nhật phim mới vietsub mỗi ngày, xem miễn phí hàng nghìn bộ phim HD/4K đa thể loại.',
  keywords: [
    'lophim',
    'phim hay',
    'Phim Trung Quốc',
    ' Phim Hàn Quốc',
    'Phim chiếu rạp',
    'Phim hành động',
    'Phim kinh di',
    'Phim hài',
    'Phim hoạt hình',
    'Phim bộ hay nhất',
    'Xem phim Online',
  ],
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://lophim.site'),
  // authors: [{ name: 'Tên tác giả' }],
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
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Toaster />
        <Analytics/>
        <SpeedInsights/>
       {children}
      </body>
    </html>
  );
}
