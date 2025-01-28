'use client';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import React, { useEffect, useState } from 'react';
// import { Input } from '../ui/input';
// import { signOut, useSession } from 'next-auth/react';
// import { Avatar, AvatarFallback } from '../ui/avatar';
import Image from 'next/image';
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from '../ui/dropdown-menu';
// import { logoutApi } from '@/requestApi/auth/login';
import { useIsMobile } from '@/hooks/use-mobile';

import { MobileHeader } from './mobile-header';
import SearchX from './search';

export const pages = [
  {
    label: 'Phim Mới Nhất',
    href: '/phim-moi-cap-nhat',
  },
  {
    label: 'Phim Lẻ',
    href: '/phim-le',
  },
  {
    label: 'Phim Bộ',
    href: '/phim-bo',
  },
  {
    label: 'Quốc Gia',
    href: '#',
    submenus: [
      { href: '/quoc-gia?q=viet-nam', label: 'Việt Nam' },
      { href: '/quoc-gia?q=trung-quoc', label: 'Trung Quốc' },
      { href: '/quoc-gia?q=au-my', label: 'Âu Mỹ' },
      { href: '/quoc-gia?q=han-quoc', label: 'Hàn Quốc' },
      { href: '/quoc-gia?q=nhat-ban', label: 'Nhật Bản' },
      { href: '/quoc-gia?q=dai-loan', label: 'Đài Loan' },
      { href: '/quoc-gia?q=thai-lan', label: 'Thái Lan' },
      { href: '/quoc-gia?q=an-do', label: 'Ấn Độ' },
      { href: '/quoc-gia?q=hong-kong', label: 'Hồng Kông' },
    ],
  },
  {
    label: 'Thể Loại',
    href: '#',
    submenus: [
      // { href: '/the-loai?t=am-nhac', label: 'Âm Nhạc' },
      { href: '/the-loai?t=bi-an', label: 'Bí Ẩn' },
      { href: '/the-loai?t=chien-tranh', label: 'Chiến Tranh' },
      { href: '/the-loai?t=chinh-kich', label: 'Chính Kịch' },
      { href: '/the-loai?t=co-trang', label: 'Cổ Trang' },
      { href: '/the-loai?t=gia-dinh', label: 'Gia Đình' },
      { href: '/the-loai?t=phim-hai', label: 'Hài' },
      { href: '/the-loai?t=hanh-dong', label: 'Hành Động' },
      { href: '/the-loai?t=hinh-su', label: 'Hình Sự' },
      { href: '/the-loai?t=hoat-hinh', label: 'Hoạt hình' },
      // { href: '/the-loai?t=hoc-duong', label: 'Học Đường' },
      { href: '/the-loai?t=khoa-hoc-vien-tuong', label: 'Khoa Học Viễn Tưởng' },
      { href: '/the-loai?t=kinh-di', label: 'Kinh Dị' },
      // { href: '/the-loai?t=kinh-dien', label: 'Kinh Điển' },
      { href: '/the-loai?t=lich-su', label: 'Lịch Sử' },
      { href: '/the-loai?t=mien-tay', label: 'Miền Tây' },
      { href: '/the-loai?t=phieu-luu', label: 'Phiêu Lưu' },
      { href: '/the-loai?t=tai-lieu', label: 'Tài Liệu' },
      { href: '/the-loai?t=tam-ly', label: 'Tâm Lý' },
      // { href: '/the-loai?t=than-thoai', label: 'Thần Thoại' },
      // { href: '/the-loai?t=the-thao', label: 'Thể Thao' },
      { href: '/the-loai?t=tinh-cam', label: 'Tình Cảm' },
      { href: '/the-loai?t=lang-man', label: 'Lãng Mạn' },
      // { href: '/the-loai?t=tre-em', label: 'Trẻ Em' },
      { href: '/the-loai?t=gay-can', label: 'Gây Cấn' },
      { href: '/the-loai?t=vo-thuat', label: 'Võ Thuật' },
      { href: '/the-loai?t=phim-18', label: '18+' },
    ],
  },
];

const Header = () => {
  // const { data: session } = useSession();
  const isMobile = useIsMobile();
  const [isAtTop, setIsAtTop] = useState(true);

  // const handleClickOutside = useCallback(e => {
  //   if (!e.target.closest('.search-container')) {
  //     // console.log('click outside');
  //     setShowResults(false);
  //   }
  // }, []);
  // Cleanup debounce on unmount

  // useEffect(() => {
  //   document.addEventListener('click', handleClickOutside);
  //   return () => {
  //     document.removeEventListener('click', handleClickOutside);
  //   };
  // }, [handleClickOutside]);

  useEffect(() => {
    const handleScroll = () => {
      setIsAtTop(window.scrollY === 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const DesktopNav = () => (
    <>
      <NavigationMenu className="justify-between">
        <div className="pr-4 min-w-[100px]">
          <Link href="/">
            <Image src="/logo2.png" alt="phimtocdo" quality={100} height={100} width={150} />
          </Link>
        </div>
        <NavigationMenuList>
          {pages.map(page => (
            <NavigationMenuItem key={page.label}>
              {page.submenus ? (
                <>
                  <NavigationMenuTrigger className="bg-inherit">{page.label}</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] bg-background">
                      {page.submenus.map(item => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className={cn(
                            'block select-none space-y-1 rounded-lg p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-600 hover:text-accent-foreground focus:bg-slate-500 focus:text-accent-foreground'
                          )}
                        >
                          <div className="text-sm font-medium leading-none">{item.label}</div>
                        </Link>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </>
              ) : (
                <Link href={page.href} legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>{page.label}</NavigationMenuLink>
                </Link>
              )}
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </>
  );
  return (
    <>
      <header
        className={`h-16 fixed top-0 left-0 w-full z-[100] transition-all duration-300 ${
          isAtTop ? 'bg-transparent' : 'bg-[#232d37] shadow-md'
        }`}
      >
        <div className="px-4 md:px-12 h-full flex justify-between items-center">
          {!isMobile && <DesktopNav />}
          <NavigationMenu>
            <NavigationMenuList>
              <SearchX />
            </NavigationMenuList>
          </NavigationMenu>
          {isMobile && <MobileHeader pages={pages} />}
        </div>
      </header>
    </>
  );
};

export default Header;
