import { Box, Button, ListItemText, Menu, MenuItem } from '@mui/material';
import Link from 'next/link';
import React from 'react';
import { pages } from './header';
import Grid from '@mui/material/Grid2';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export const DropdownMenu = ({ label, submenus, href }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ height: '100%' }}>
      <Button
        id={`${label}-button`}
        aria-controls={open ? `${label}-menu` : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
        sx={{
          width: '100%',
          // width: 'auto',
          height: '100%',
          color: 'white',
          textTransform: 'none',
          '&:hover': {
            backgroundColor: '#292838',
            color: '#ff9e13',
          },
        }}
      >
        <ListItemText>{label}</ListItemText>
      </Button>
      <Menu
        id={`${label}-menu`}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': `${label}-button`,
        }}
        sx={{
          '& .MuiPaper-root': {
            backgroundColor: 'background.default',
            mt: 1,
            // minWidth: 130,
            marginTop: 0,
            maxWidth: '490px',
            // width: 'auto',
            // maxWidth: '125px',
          },
        }}
        disableScrollLock={true}
      >
        <Grid container rowSpacing={2} >
          {submenus.map(item => (
            <Grid size={4} key={item.href}>
              <MenuItem
                key={item.href}
                onClick={handleClose}
                sx={{
                  '&:hover': {
                    height: '100%',
                    backgroundColor: '#292838',
                    color: '#ff9e13',
                    // width: 'auto',
                  },
                  padding: '0rem',
                  // width: '100%',
                }}
              >
                <Link
                  href={item.href}
                  style={{
                    // color: '#C0C0C0',
                    height: '100%',
                    width: '100%',
                    padding: '0.5rem',
                    fontSize: '0.9rem',
                    textAlign: 'center',
                  }}
                >
                  {item.label}
                </Link>
              </MenuItem>
            </Grid>
          ))}
        </Grid>
      </Menu>
    </Box>
  );
};

const DesktopMenu: React.FC = () => {
  // const DesktopMenu = () => (
  return (
    <Box sx={{ height: '100%', flexGrow: 1, display: { xs: 'none', md: 'flex' }, gap: { md: 2, sm: 1 } }}>
      {pages.map(({ label, href, submenus }) => (
        <Box key={href}>
          {submenus.length > 0 ? (
            <DropdownMenu label={label} submenus={submenus} href={href} />
          ) : (
            <Link
              // component={Link}
              href={href}
              style={{ height: '100%' }}
            >
              <Button
                sx={{
                  color: 'white',
                  height: '100%',
                  textTransform: 'none',
                  '&:hover': {
                    backgroundColor: '#292838',
                    color: '#ff9e13',
                  },
                }}
              >
                <ListItemText>{label}</ListItemText>
              </Button>
            </Link>
          )}
        </Box>
      ))}
    </Box>
  );

  // );
  // return (
  //   <>
  //          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, gap: { md: 2, sm: 1 } }}>
  //             {pages.map(({ label, href, submenus }) => (
  //               <Box
  //                 key={href}
  //                 // onClick={handleCloseNavMenu}
  //                 sx={{ color: 'white', '&:hover': { backgroundColor: '#292838', color: '#ff9e13' } }}
  //               >
  //                 {submenus.length < 1 ? (
  //                   <Link href={href}>
  //                     <Box sx={{ p: 2 }}>
  //                       <ListItemText primary={label} />
  //                     </Box>
  //                   </Link>
  //                 )
  //                 : (
  //                   <></>
  //                   // <>
  //                   //   <ListItemText
  //                   //     id={`basic-button-${label}`}
  //                   //     aria-controls={openMenus[label] ? `basic-menu-${label}` : undefined}
  //                   //     aria-haspopup="true"
  //                   //     aria-expanded={openMenus[label] ? 'true' : undefined}
  //                   //     onClick={event => handleClick(event, label)}
  //                   //     sx={{ cursor: 'pointer' }}
  //                   //   >
  //                   //     {label}
  //                   //   </ListItemText>

  //                   //   {/* Menu chỉ nên được tạo một lần cho mỗi mục */}
  //                   //   <Menu
  //                   //     key={label}
  //                   //     id={`basic-menu-${label}`}
  //                   //     anchorEl={anchorEl}
  //                   //     open={openMenus[label] || false}
  //                   //     onClose={() => handleClose(label)}
  //                   //     MenuListProps={{
  //                   //       'aria-labelledby': `basic-button-${label}`,
  //                   //     }}
  //                   //     sx={{
  //                   //       display: 'flex',
  //                   //       flexDirection: 'column',
  //                   //       gap: 1,
  //                   //     }}
  //                   //   >
  //                   //     {submenus.map((item:any) => (
  //                   //       <MenuItem key={item.href}>
  //                   //         <Link href={item.href}>{item.label}</Link>
  //                   //       </MenuItem>
  //                   //     ))}
  //                   //   </Menu>
  //                   // </>

  //                 )
  //                 }
  //               </Box>
  //             ))}
  //           </Box>
  //   </>
  // );
};

export default DesktopMenu;
