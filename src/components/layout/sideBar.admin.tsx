'use client';
import * as React from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Link from 'next/link';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import MovieCreationIcon from '@mui/icons-material/MovieCreation';
import { Accordion, AccordionDetails, Avatar, Button, Menu, MenuItem, Tooltip } from '@mui/material';
import { signOut, useSession } from 'next-auth/react';
import { green, red } from '@mui/material/colors';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';

const drawerWidth = 240;

const navigation = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: <DashboardIcon />,
    submenus: [],
  },
  {
    label: 'Phim chưa hoàn tất',
    href: '/incomplete',
    icon: <DashboardIcon />,
    submenus: [],
  },
  {
    label: 'Phim',
    href: '/movies',
    icon: <MovieCreationIcon />,
    submenus: [
      {
        label: 'Phim lẻ',
        href: '/movies',
      },
      {
        label: 'Phim Bộ',
        href: '/tv',
      },
    ],
  },
  {
    label: 'Thể loại',
    href: '/genres',
    icon: <AddToPhotosIcon />,
    submenus: [],
  },
  {
    label: 'Users',
    href: '/users',
    icon: <PersonIcon />,
    submenus: [],
  },
];

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: prop => prop !== 'open',
})<AppBarProps>(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: prop => prop !== 'open' })(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  variants: [
    {
      props: ({ open }) => open,
      style: {
        ...openedMixin(theme),
        '& .MuiDrawer-paper': openedMixin(theme),
      },
    },
    {
      props: ({ open }) => !open,
      style: {
        ...closedMixin(theme),
        '& .MuiDrawer-paper': closedMixin(theme),
      },
    },
  ],
}));

export default function AdminSideBar() {
  const { data: session } = useSession();
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);

  const [openExtend, setOpenExtend] = React.useState(false);

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const [openAccordion, setOpenAccordion] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!open) {
      // Khi sidebar đóng, tự động đóng các submenu
      setOpenExtend(false);
      setOpenAccordion(null);
    }
  }, [open]);
  const logout = React.useCallback(() => {
    const accessToken = session?.access_token || undefined;

    fetch(`/api/auth/logout`, {
      // this comes from your .env file, e.x. http://localhost:3000 where your nextjs app runs
      method: 'POST',
      body: JSON.stringify({ accessToken }),
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        /* send log to the Sentry if the endpoint fails
                if (!data.success)
                    notifySentry("Could not log out!")
                 */
      })
      .catch(error => {
        console.log(error);
        /* send log to the Sentry if an error occurs
                notifySentry(error)
                 */
      })
      .finally(async () => {
        // after logout, we redirect user to the login page
        await signOut({ callbackUrl: `/` });
      });
  }, [session]);

  React.useEffect(() => {
    // console.log('session: ', session);
    if (session?.error === 'AccessTokenError') {
      logout();
    }
  }, [session, logout]);
  const handleAccordionClick = (label: string) => {
    if (!open) {
      // Nếu sidebar đang đóng, mở sidebar và submenu
      setOpen(true);
      setOpenExtend(true); // Mở submenu
      setOpenAccordion(label); // Set submenu đang mở
    } else if (openAccordion === label) {
      // Nếu submenu hiện tại đang mở, nhấn để đóng submenu
      setOpenExtend(false);
      setOpenAccordion(null);
    } else {
      // Khi người dùng chọn một submenu khác
      setOpenExtend(true);
      setOpenAccordion(label);
    }
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  return (
    <Box>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={[
              {
                marginRight: 5,
              },
              open && { display: 'none' },
            ]}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <Box>
              <Typography variant="h6" noWrap component="div">
                lophim
              </Typography>
            </Box>
            <Box>
              <Tooltip title="Admin">
                <IconButton sx={{ p: 0 }} onClick={handleOpenUserMenu}>
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
              >
                <MenuItem onClick={handleCloseUserMenu}>
                  <Button
                    sx={{
                      color: red[300],
                      '&:hover': {
                        backgroundColor: 'initial', // Tắt đổi màu khi hover
                        boxShadow: 'none', // Tắt đổ bóng khi hover
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
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {navigation.map(item => (
            <ListItem key={item.href} disablePadding sx={{ display: 'block' }}>
              {item.submenus && item.submenus.length > 0 ? (
                // Nếu có submenu, ta sẽ xử lý mở accordion
                <>
                  <ListItemButton
                    onClick={() => handleAccordionClick(item.label)}
                    sx={[
                      {
                        minHeight: 48,
                        px: 2.5,
                      },
                      open
                        ? {
                            justifyContent: 'initial',
                          }
                        : {
                            justifyContent: 'center',
                          },
                    ]}
                  >
                    <ListItemIcon
                      sx={[
                        {
                          minWidth: 0,
                          justifyContent: 'center',
                        },
                        open
                          ? {
                              mr: 3,
                            }
                          : {
                              mr: 'auto',
                            },
                      ]}
                    >
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText
                      sx={[
                        open
                          ? {
                              opacity: 1,
                            }
                          : {
                              opacity: 0,
                            },
                      ]}
                      primary={item.label}
                    >
                      {/* {item.label} */}
                    </ListItemText>

                    <ExpandMoreIcon
                      sx={[
                        {
                          transition: 'transform 0.3s ease', // Hiệu ứng quay
                        },
                        open
                          ? {
                              opacity: 1,
                              display: 'inline-flex',
                              transform: openExtend === true ? 'rotate(180deg)' : 'rotate(0deg)', // Quay icon khi submenu mở
                            }
                          : {
                              opacity: 0,
                              display: 'none', // Ẩn hoàn toàn khi sidebar đóng
                            },
                      ]}
                    />
                  </ListItemButton>

                  {/* Show submenu khi accordion mở */}
                  {openAccordion === item.label && (
                    <Accordion expanded>
                      <AccordionDetails>
                        {item.submenus.map(submenu => (
                          <ListItemButton
                            sx={[
                              {
                                minHeight: 48,
                                px: 2.5,
                              },
                              open
                                ? {
                                    justifyContent: 'initial',
                                  }
                                : {
                                    justifyContent: 'center',
                                  },
                            ]}
                            key={submenu.href}
                            component={Link}
                            href={`/admin/${submenu.href.toLowerCase()}`}
                          >
                            <ListItemText
                              sx={[
                                open
                                  ? {
                                      opacity: 1,
                                    }
                                  : {
                                      opacity: 0,
                                    },
                              ]}
                              primary={submenu.label}
                            />
                          </ListItemButton>
                        ))}
                      </AccordionDetails>
                    </Accordion>
                    // </ListItemText>
                  )}
                </>
              ) : (
                // Nếu không có submenu, ta sẽ link trực tiếp
                <ListItemButton
                  component={Link}
                  href={`/admin/${item.href.toLowerCase()}`}
                  sx={[
                    {
                      minHeight: 48,
                      px: 2.5,
                    },
                    open
                      ? {
                          justifyContent: 'initial',
                        }
                      : {
                          justifyContent: 'center',
                        },
                  ]}
                >
                  <ListItemIcon
                    sx={[
                      {
                        minWidth: 0,
                        justifyContent: 'center',
                      },
                      open
                        ? {
                            mr: 3,
                          }
                        : {
                            mr: 'auto',
                          },
                    ]}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    sx={[
                      open
                        ? {
                            opacity: 1,
                          }
                        : {
                            opacity: 0,
                          },
                    ]}
                    primary={item.label}
                  />
                </ListItemButton>
              )}
            </ListItem>
          ))}
        </List>

        <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={[
                  {
                    minHeight: 48,
                    px: 2.5,
                  },
                  open
                    ? {
                        justifyContent: 'initial',
                      }
                    : {
                        justifyContent: 'center',
                      },
                ]}
              >
                <ListItemIcon
                  sx={[
                    {
                      minWidth: 0,
                      justifyContent: 'center',
                    },
                    open
                      ? {
                          mr: 3,
                        }
                      : {
                          mr: 'auto',
                        },
                  ]}
                >
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText
                  primary={text}
                  sx={[
                    open
                      ? {
                          opacity: 1,
                        }
                      : {
                          opacity: 0,
                        },
                  ]}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
}
