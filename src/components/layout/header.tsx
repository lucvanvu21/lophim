'use client';
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
// import { styled, alpha } from '@mui/material/styles';
import Grid from '@mui/material/Grid2';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import { green, red } from '@mui/material/colors';
// import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Collapse, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Slide } from '@mui/material';
import { moviesRequestApi } from '@/requestApi/movies/movies';
import { IMovies } from '@/types';
import Image from 'next/image';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';

import { useRouter } from 'next/navigation';
import CloseIcon from '@mui/icons-material/Close';
import { debounce } from 'lodash';
import DesktopMenu from './desktopMenu';

export const pages = [
  // {
  //   label: 'Trang Chủ',
  //   href: '/',
  //   // icon: <MovieIcon />,
  //   submenus: [],
  // },
  {
    label: 'Hoạt Hình',
    href: '/hoat-hinh',
    // icon: <MovieIcon />,
    submenus: [],
  },
  {
    label: 'Phim Lẻ',
    href: '/movies',
    // icon: <MovieIcon />,
    submenus: [],
  },
  {
    label: 'Phim Bộ',
    href: '/tv',
    // icon: <MovieIcon />,
    submenus: [],
  },

  {
    label: 'Quốc gia',
    href: '/year?year=2024',
    submenus: [
      {
        _id: 'f6ce1ae8b39af9d38d653b8a0890adb8',
        label: 'Việt Nam',
        href: '/quoc-gia/viet-nam',
      },
      {
        _id: '92aa3c93de523a414a520399bb6a4304',
        label: 'Trung Quốc',
        href: '/quoc-gia/trung-quoc',
      },
      {
        _id: '2975bbecb6017f4b4f06951f76d858de',
        label: 'Thái Lan',
        href: '/quoc-gia/thai-lan',
      },
      {
        _id: 'a0cd53c9875b96640ac264ca81996f9f',
        label: 'Hồng Kông',
        href: '/quoc-gia/hong-kong',
      },
      {
        _id: 'af6c20a40538d2008ca3ad0bae2ddea7',
        label: 'Pháp',
        href: '/quoc-gia/phap',
      },
      {
        _id: '24efe2fae513e7066e4a812019b64a66',
        label: 'Đức',
        href: '/quoc-gia/duc',
      },
      {
        _id: '14da7029b3324f5c04debb3f687e3d49',
        label: 'Hà Lan',
        href: '/quoc-gia/ha-lan',
      },
      {
        _id: '8dbb07a18d46f63d8b3c8994d5ccc351',
        label: 'Mexico',
        href: '/quoc-gia/mexico',
      },
      {
        _id: '3d2e31a8a43a2f5822a1e83b4fd22ed5',
        label: 'Thụy Điển',
        href: '/quoc-gia/thuy-dien',
      },
      {
        _id: '77dab2f81a6c8c9136efba7ab2c4c0f2',
        label: 'Philippines',
        href: '/quoc-gia/philippines',
      },
      {
        _id: 'da63256637bc200891fe4e5611309052',
        label: 'Đan Mạch',
        href: '/quoc-gia/dan-mach',
      },
      {
        _id: '43310be428ad436c18bab53ee81a1f19',
        label: 'Thụy Sĩ',
        href: '/quoc-gia/thuy-si',
      },
      {
        _id: 'c338f80e38dd2381f8faf9eccb6e6c1c',
        label: 'Ukraina',
        href: '/quoc-gia/ukraina',
      },
      {
        _id: 'b28b3d249312674db6cc7533cbbc2936',
        label: 'Hàn Quốc',
        href: '/quoc-gia/han-quoc',
      },
      {
        _id: 'af5c50bf625c1da71838678a5cf37189',
        label: 'Âu Mỹ',
        href: '/quoc-gia/au-my',
      },
      {
        _id: '32d2319752dd165daba82f59878c6afb',
        label: 'Ấn Độ',
        href: '/quoc-gia/an-do',
      },
      {
        _id: '445d337b5cd5de476f99333df6b0c2a7',
        label: 'Canada',
        href: '/quoc-gia/canada',
      },
      {
        _id: '8a40abac202ab3659bb98f71f05458d1',
        label: 'Tây Ban Nha',
        href: '/quoc-gia/tay-ban-nha',
      },
      {
        _id: '4647d00cf81f8fb0ab80f753320d0fc9',
        label: 'Indonesia',
        href: '/quoc-gia/indonesia',
      },
      {
        _id: '59317f665349487a74856ac3e37b35b5',
        label: 'Ba Lan',
        href: '/quoc-gia/ba-lan',
      },
      {
        _id: '3f0e49c46cbde0c7adf5ea04a97ab261',
        label: 'Malaysia',
        href: '/quoc-gia/malaysia',
      },
      {
        _id: '56850d238ce31824c4bc21fd9b75b145',
        label: 'Bồ Đào Nha',
        href: '/quoc-gia/bo-dao-nha',
      },
      {
        _id: 'b6ae56d2d40c99fc293aefe45dcb3b3d',
        label: 'UAE',
        href: '/quoc-gia/uae',
      },
      {
        _id: '471cdb11e01cf8fcdafd3ab5cd7b4241',
        label: 'Châu Phi',
        href: '/quoc-gia/chau-phi',
      },
      {
        _id: '31546b274c0da003420bd6a21822c48a',
        label: 'Ả Rập Xê Út',
        href: '/quoc-gia/a-rap-xe-ut',
      },
      {
        _id: 'b8f81b0defa84c5a7ac72bcdbcee8bb8',
        label: 'Nhật Bản',
        href: '/quoc-gia/nhat-ban',
      },
      {
        _id: 'af5f08b6445ca1def86fdd38cc1dc0b2',
        label: 'Đài Loan',
        href: '/quoc-gia/dai-loan',
      },
      {
        _id: '932bbaca386ee0436ad0159117eabae4',
        label: 'Anh',
        href: '/quoc-gia/anh',
      },
      {
        _id: '2fe255994986c448c81c6c5b79b7348b',
        label: 'Quốc Gia Khác',
        href: '/quoc-gia/quoc-gia-khac',
      },
      {
        _id: 'dc655a18ab16bec3fe66b101d71fcb04',
        label: 'Thổ Nhĩ Kỳ',
        href: '/quoc-gia/tho-nhi-ky',
      },
      {
        _id: '2dbf49dd0884691f87e44769a3a3a29e',
        label: 'Nga',
        href: '/quoc-gia/nga',
      },
      {
        _id: '1e7544b766ada0a3a68a7c3eb171464a',
        label: 'Úc',
        href: '/quoc-gia/uc',
      },
      {
        _id: '42537f0fb56e31e20ab9c2305752087d',
        label: 'Brazil',
        href: '/quoc-gia/brazil',
      },
      {
        _id: '49e6eb06f8be23e60dad618725b12946',
        label: 'Ý',
        href: '/quoc-gia/y',
      },
      {
        _id: '638f494a6d33cf5760f6e95c8beb612a',
        label: 'Na Uy',
        href: '/quoc-gia/na-uy',
      },
      {
        _id: '3cf479dac2caaead12dfa36105b1c402',
        label: 'Nam Phi',
        href: '/quoc-gia/nam-phi',
      },
    ],
  },
  {
    label: 'Thể Loại',
    href: '/',
    submenus: [
      {
        _id: '5060cc424f1d7d870f294cc4cf89d5c4',
        label: 'Hành Động',
        href: '/the-loai/hanh-dong',
      },
      {
        _id: 'd111447ee87ec1a46a31182ce4623662',
        label: 'Miền Tây',
        href: '/the-loai/mien-tay',
      },
      {
        _id: '0c853f6238e0997ee318b646bb1978bc',
        label: 'Trẻ Em',
        href: '/the-loai/tre-em',
      },
      {
        _id: 'f8ec3e9b77c509fdf64f0c387119b916',
        label: 'Lịch Sử',
        href: '/the-loai/lich-su',
      },
      {
        _id: '34af679d241f8192eea2b57ef6e938a8',
        label: 'Cổ Trang',
        href: '/the-loai/co-trang',
      },
      {
        _id: '80a0052a8fb20e24d19b33e7ef7ffa10',
        label: 'Chiến Tranh',
        href: '/the-loai/chien-tranh',
      },
      {
        _id: 'fbdb6b1d270002e30ba9f6f2f13e4b71',
        label: 'Viễn Tưởng',
        href: '/the-loai/vien-tuong',
      },
      {
        _id: '5059e42facecd4605464027b675424b0',
        label: 'Kinh Dị',
        href: '/the-loai/kinh-di',
      },
      {
        _id: '7717c71a37aeee4654db725f93fa11ff',
        label: 'Tài Liệu',
        href: '/the-loai/tai-lieu',
      },
      {
        _id: 'fba1c1cdc07d74e5b173beb5fa26dccf',
        label: 'Bí Ẩn',
        href: '/the-loai/bi-an',
      },
      {
        _id: '4b4457a1af8554c282dc8ac41fd7b4a1',
        label: 'Phim 18+',
        href: '/the-loai/phim-18',
      },
      {
        _id: '46a6df48b64935df845cf8ad4f448d4c',
        label: 'Tình Cảm',
        href: '/the-loai/tinh-cam',
      },
      {
        _id: '1a18f0d42e4e66060dbf1fd7cb25d11a',
        label: 'Tâm Lý',
        href: '/the-loai/tam-ly',
      },
      {
        _id: '06cb2c707ea5c7fbf8658d833ec2f0e3',
        label: 'Thể Thao',
        href: '/the-loai/the-thao',
      },
      {
        _id: '66c78b23908113d478d8d85390a244b4',
        label: 'Phiêu Lưu',
        href: '/the-loai/phieu-luu',
      },
      {
        _id: 'c6d78df96182451f1381522172b77a69',
        label: 'Âm Nhạc',
        href: '/the-loai/am-nhac',
      },
      {
        _id: 'fd190fc8d1698c641aa56bc1ac9738e2',
        label: 'Gia Đình',
        href: '/the-loai/gia-dinh',
      },
      {
        _id: '7d1de48a9e7df7efee761d59522d0026',
        label: 'Học Đường',
        href: '/the-loai/hoc-duong',
      },
      {
        _id: 'd72b9939ba77f7d6d1ce88673bd1f18f',
        label: 'Hài Hước',
        href: '/the-loai/hai-huoc',
      },
      {
        _id: '35f2b21717ff9e6e817a5ffcbf03bee2',
        label: 'Hình Sự',
        href: '/the-loai/hinh-su',
      },
      {
        _id: 'eb2363d2cccc7aa6aa6ca7bfc8fe14f9',
        label: 'Võ Thuật',
        href: '/the-loai/vo-thuat',
      },
      {
        _id: 'cfaa2e22bb555672e3f2b1b3e2084ac6',
        label: 'Khoa Học',
        href: '/the-loai/khoa-hoc',
      },
      {
        _id: '0fcf63d85bf8ff2319725225a72579d5',
        label: 'Thần Thoại',
        href: '/the-loai/than-thoai',
      },
      {
        _id: '2b1db3509d24deb92dff04427c3b8c02',
        label: 'Chính Kịch',
        href: '/the-loai/chinh-kich',
      },
      {
        _id: '6ef24f2b0d88d6f32b79bbc9fe938b11',
        label: 'Kinh Điển',
        href: '/the-loai/kinh-dien',
      },
      {
        _id: '6ef24f2b0d88d6f32b79bbc9fe93823f',
        label: '18+',
        href: '/the-loai/phim-18',
      },
    ],
  },
  // {
  //   label: 'Thể loại',
  //   href: '/year?year=2024',

  //   submenus: [
  //     {
  //       href: '/year?year=2024',
  //       label: 'Hanh dong',
  //     },
  //     {
  //       href: '/year?year=2024',
  //       label: 'Hai',
  //     },
  //   ],
  // },
  {
    label: 'Năm',
    href: '#',
    submenus: [
      {
        href: '/nam/2024',
        label: '2024',
      },
      {
        href: '/nam/2023',
        label: '2023',
      },
      {
          href: '/nam/2022',
        label: '2022',
      },
      {
        href: '/nam/2021',
        label: '2021',
      },
      {
        href: '/nam/2020',
        label: '2020',
      },
      {
        href: '/nam/2019',
        label: '2019',
      },
      {
        href: '/nam/2018',
        label: '2018',
      },
      {
        href: '/nam/2017',
        label: '2017',
      },
      {
        href: '/nam/2016',
        label: '2016',
      },
      {
        href: '/nam/2015',
        label: '2015',
      },
      {
        href: '/nam/2014',
        label: '2014',
      },
      {
        href: '/nam/2013',
        label: '2013',
      },
      {
        href: '/nam/2012',
        label: '2012',
      },
      {
        href: '/nam/2011',
        label: '2011',
      },
      {
        href: '/nam/2011',
        label: '2011',
      },
      {
        href: '/nam/2010',
        label: '2010',
      },
      {
        href: '/nam/2009',
        label: '2009',
      },
      {
        href: '/nam/2008',
        label: '2008',
      },
      {
        href: '/nam/2008',
        label: '2008',
      },
    ],
  },
];

export default function Header() {
  const { data: session } = useSession();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [openMenus, setOpenMenus] = React.useState<{ [key: string]: boolean }>({});
  const [searchQuery, setSearchQuery] = React.useState('');
  const [movieResults, setMovieResults] = React.useState([]);
  const [openSubMenus, setOpenSubMenus] = React.useState(false);
  const [openSubmenu, setOpenSubmenu] = React.useState<string | null>(null);
  const router = useRouter();

  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  // Hàm gọi API tìm kiếm
  const fetchSearchResults = async (query: string) => {
    if (query.length > 0) {
      const data = await moviesRequestApi.getSearch(query, 1, 10);

      // console.log('data search:', data.data.result);
      setMovieResults(data?.data?.items);
    }
  };

  // Sử dụng debounce cho hàm fetchSearchResults
  const debounceFetch = React.useCallback(
    debounce(query => {
      fetchSearchResults(query);
    }, 800),
    []
  );

  const handleInputChange = (e: any) => {
    const query = e.target.value;
    setSearchQuery(query);
    debounceFetch(query);
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>, label: string) => {
    setAnchorEl(event.currentTarget as HTMLElement);
    setOpenMenus(prev => ({
      ...prev,
      [label]: true,
    }));
  };
  const handleClose = (label: string) => {
    setOpenMenus(prev => ({
      ...prev,
      [label]: false, // Đóng menu theo nhãn (label)
    }));
    setAnchorEl(null);
  };

  // const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
  //   setAnchorElNav(event.currentTarget);
  // };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleSearch = async (searchQuery: string) => {
    if (searchQuery.trim().length > 0) {
      router.push(`/search?q=${searchQuery}`);
      setSearchQuery('');
    }
  };

  const logout = React.useCallback(() => {
    const accessToken = session?.access_token || undefined;

    fetch(`/api/auth/logout`, {
      method: 'POST',
      body: JSON.stringify({ accessToken }),
    })
      .then(res => res.json())

      .finally(async () => {
        await signOut({ callbackUrl: `/` });
      });
  }, [session]);

  React.useEffect(() => {
    // console.log('session: ', session);
    if (session?.error === 'AccessTokenError') {
      logout();
    }
  }, [session, logout]);

  // const handleSignout = () => {
  //   signOut({ callbackUrl: '/' });
  // };
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };
  const handleToggle = (href: string) => {
    setOpenSubmenu(prevHref => (prevHref === href ? null : href));
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation">
      <List>
        <ListItem disablePadding>
          <ListItemButton sx={{ width: '100%' }} onClick={toggleDrawer(false)}>
            <Link href="/">
              <Typography
                variant="h6"
                color="primary"
                noWrap
                align="center"
                sx={{
                  mr: 2,
                  display: 'flex',
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  justifyContent: 'center',
                  alignItems: 'center',
                  maxWidth: '180px',
                  letterSpacing: '.3rem',
                  textDecoration: 'none',
                }}
              >
                <Image
                  src={'/logo.png'}
                  width={40}
                  height={40}
                  style={{
                    width: '100%',
                    height: 'auto',
                    // borderRadius: '4px',
                  }}
                  alt="lophim.site"
                ></Image>
              </Typography>
            </Link>
          </ListItemButton>
        </ListItem>
      </List>

      <Divider />
      <List>
        {pages.map(({ href, label, submenus }) => (
          <ListItem key={href} disablePadding>
            {submenus.length > 0 ? (
              <Box sx={{ width: '100%' }}>
                <ListItemButton
                  onClick={() => {
                    toggleDrawer(true);
                    handleToggle(href);
                  }}
                  sx={{ paddingX: 5, width: '100%' }}
                >
                  <ListItemText sx={{ width: '100%' }} primary={label} />
                  <ExpandMoreIcon
                    sx={[
                      {
                        transition: 'transform 0.3s ease',
                      },
                      {
                        opacity: 1,
                        display: 'inline-flex',
                        transform: openSubmenu === href ? 'rotate(180deg)' : 'rotate(0deg)', // Quay icon khi submenu mở
                      },
                    ]}
                  />
                </ListItemButton>
                <Collapse in={openSubmenu === href} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <Grid container rowSpacing={1}>
                      {submenus.map(submenu => (
                        <Grid size={{ xs: 6, md: 6 }} key={submenu.href}>
                          <ListItemButton sx={{ paddingX: 1, width: '100%' }} onClick={toggleDrawer(true)}>
                            <Link
                              href={submenu.href}
                              style={{ width: '100%', color: '#C0C0C0', fontSize: '14px', textAlign: 'center' }}
                            >
                              {submenu.label}
                            </Link>
                          </ListItemButton>
                        </Grid>
                      ))}
                    </Grid>
                  </List>
                </Collapse>
              </Box>
            ) : (
              // </Box>
              // <DropdownMenu label={label} submenus={submenus} href={href}/>
              <Link href={href} style={{ width: '100%' }}>
                <ListItemButton onClick={toggleDrawer(false)} sx={{ paddingX: 5 }}>
                  {/* <ListItemIcon>{index % 2 === 0 ? 11 : 112}</ListItemIcon> */}
                  <ListItemText primary={label} />
                </ListItemButton>
              </Link>
            )}
          </ListItem>
        ))}
      </List>
      <Divider />
      {/* <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>{index % 2 === 0 ? 11 : 112}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List> */}
    </Box>
  );
  // console.log('movieResults:', movieResults);+
  return (
    <>
      {/* <Slide appear={false} direction="down" in={!scrolled}> */}
      <AppBar
        position="fixed"
        style={{
          backgroundColor: scrolled ? '#0c1824' : 'transparent',
          transition: 'background-color 0.3s ease',
        }}
        elevation={scrolled ? 4 : 0}
      >
        <Container maxWidth="xl" sx={{ height: 75 }}>
          <Toolbar disableGutters sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 75 }}>
            <Link href="/">
              {/* <AdbIcon sx={{ display: { xs: 'none',sm:'flex', md: 'none',lg:'block' }, mr: 1 }} /> */}
              <Typography
                variant="h6"
                color="primary"
                noWrap
                align="center"
                // component="a"
                sx={{
                  mr: 2,
                  display: { xs: 'none', sm: 'none', md: 'flex' },
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  justifyContent: 'center',
                  alignItems: 'center',
                  letterSpacing: '.3rem',
                  textDecoration: 'none',
                  maxWidth: '180px',
                }}
              >
                <Image
                  src={'/logo.png'}
                  width={80}
                  height={40}
                  style={{
                    width: '100%',
                    height: 'auto',
                    // borderRadius: '4px',
                  }}
                  alt="lophim.site"
                ></Image>
                {/* lophim */}
              </Typography>
            </Link>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }, left: 0 }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={toggleDrawer(true)}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Drawer open={open} onClose={toggleDrawer(false)}>
                {DrawerList}
              </Drawer>
              {/* <DrawerList pages={pages} toggleDrawer={toggleDrawer}/> */}
            </Box>

            {/* Menu Desktop */}

            {/* <Box sx={{height:'100%'}}> */}
            <DesktopMenu />
            {/* </Box> */}
            <Box
              display="flex"
              alignItems="center"
              sx={{
                position: 'relative',
                border: '1px solid hsl(0, 0%, 18.82%)',
                // border: '1px solid #ddd',
                borderRadius: '8px',
                '&:focus-within': {
                  border: '1px solid #ff9e13', // Tăng độ dày và màu viền khi được chọn
                },
                marginRight: 2,
              }}
            >
              <InputBase
                sx={{
                  width: '100%',
                  '&:focus': {
                    outline: 'none', // Loại bỏ outline mặc định
                    border: '1px solid #ff9e13', // Màu và độ dày viền khi focus
                  },
                  // border: '1px solid #ddd',
                  // backgroundColor: '#f1f3f4',
                  padding: '6px 18px',
                  paddingLeft: '35px',
                  borderRadius: '8px',
                }}
                placeholder="Search…"
                value={searchQuery}
                onChange={handleInputChange}
                // open={open}
                // onOpen={handleOpen}
                // onClose={handleClose}
                inputProps={{ 'aria-label': 'search' }}
                // style={{

                // }}
              />
              {searchQuery && (
                <Box
                  onClick={() => setSearchQuery('')}
                  sx={{ position: 'absolute', right: '0', top: '25%', cursor: 'pointer' }}
                  mr={1}
                >
                  <CloseIcon />
                </Box>
              )}
              <Box
                onClick={() => handleSearch(searchQuery)}
                sx={{ position: 'absolute', left: '3%', top: '25%', cursor: 'pointer' }}
                mr={1}
              >
                <SearchIcon />
              </Box>
              {searchQuery && movieResults.length > 0 && (
                <Box sx={{ position: 'absolute', top: '110%', width: '100%', maxWidth: 400, bgcolor: 'background.default' }}>
                  <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.default' }}>
                    {movieResults.map((movie: any) => {
                      return (
                        <Link key={movie._id} href={`/chi-tiet-phim/${movie.slug}`}>
                          <ListItem>
                            <ListItemButton sx={{ padding: 0 }}>
                              <ListItemIcon>
                                <Image
                                  quality={30}
                                  loading="lazy"
                                  src={`${process.env.NEXT_PUBLIC_IMAGE}${movie?.poster_url}`}
                                  alt={movie.name}
                                  width={20}
                                  height={30}
                                  style={{
                                    objectFit: 'cover',
                                    // borderRadius: '4px',
                                    width: '100%',
                                    maxWidth: '50px',
                                    height: 'auto',
                                    padding: '0.5rem',
                                  }}
                                />
                              </ListItemIcon>
                              <ListItemText>
                                {movie?.name} ({movie.year})
                              </ListItemText>
                            </ListItemButton>
                          </ListItem>
                        </Link>
                      );
                    })}
                  </List>
                </Box>
              )}
            </Box>
            <Box sx={{ flexGrow: 0, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 2 }}>
              {/* <Tooltip title="Danh sách yêu thích">
                <Link
                  href={'/favorites'}
                  // href={session?.user ? '/favorites' : '#'}
                  // onClick={e => {
                  //   if (!session?.user) {
                  //     e.preventDefault();
                  //     alert('Bạn cần đăng nhập để truy cập danh sách yêu thích.');
                  //   }
                  // }}
                  // {session?.user ? { onClick: e => e.preventDefault() } : {}}
                  style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                >
                  <BookmarkBorderIcon
                    sx={{
                      '&:hover': {
                        color: '#ff9e13',
                      },
                    }}
                  ></BookmarkBorderIcon>
                </Link>
              </Tooltip> */}
              {session?.user ? (
                <Box>
                  <Tooltip title="user">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      {/* <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" /> */}
                      <Avatar sx={{ bgcolor: green[500] }}>
                        {session?.user?.name ? session?.user?.name.charAt(0).toUpperCase() : ''}
                      </Avatar>
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{ mt: '45px' }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                    disableScrollLock={true}
                  >
                    {/* {settings.map(setting => ( */}
                    {/* <MenuItem onClick={handleCloseUserMenu}>
                      <Button
                        sx={{
                          // color: red[300],
                          '&:hover': {
                            backgroundColor: 'initial', // Tắt đổi màu khi hover
                            boxShadow: 'none', // Tắt đổ bóng khi hover
                          },
                          width: '100%',
                        }}
                      >
                        <Link href={'/favorites'}>Danh sách yêu thích</Link>
                      </Button>
                    </MenuItem> */}
                    <MenuItem onClick={handleCloseUserMenu}>
                      <Button
                        sx={{
                          color: red[300],
                          '&:hover': {
                            backgroundColor: 'initial',
                            boxShadow: 'none',
                          },
                          width: '100%',
                        }}
                        onClick={() => logout()}
                      >
                        Đăng xuất
                      </Button>

                      {/* <Typography sx={{ textAlign: 'center' }}></Typography> */}
                    </MenuItem>
                    {/* // ))} */}
                  </Menu>
                </Box>
              ) : (
                <Typography>{/* <Link href="/#">Đăng nhập</Link> */}</Typography>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      {/* </Slide> */}
    </>
  );
}
