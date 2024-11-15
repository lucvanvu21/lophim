import { useState } from 'react';
import { Box, List, ListItem, ListItemButton, ListItemText, Collapse, Divider, Typography, Link } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import Image from 'next/image';

const MobileMenu = ({ pages, toggleDrawer }) => {
  const [openItems, setOpenItems] = useState({});

  // Hàm để mở/đóng từng menu con
  const handleToggle = href => {
    setOpenItems(prevOpenItems => ({
      ...prevOpenItems,
      [href]: !prevOpenItems[href],
    }));
  };

  return (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        <ListItem disablePadding>
          <ListItemButton sx={{ width: '100%' }}>
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
                  letterSpacing: '.3rem',
                  textDecoration: 'none',
                }}
              >
                <Image src={'/logo.png'} width={40} height={40} alt="lophim.site" />
              </Typography>
            </Link>
          </ListItemButton>
        </ListItem>
      </List>

      <Divider />
      <List>
        {pages.map(({ href, label, submenus }) => (
          <div key={href}>
            <ListItem disablePadding>
              {submenus.length > 0 ? (
                <>
                  <ListItemButton sx={{ paddingX: 5 }} onClick={() => handleToggle(href)}>
                    <ListItemText primary={label} />
                    {openItems[href] ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>

                  <Collapse in={openItems[href]} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      {submenus.map(submenu => (
                        <ListItemButton key={submenu.href} sx={{ pl: 8 }} component={Link} href={submenu.href}>
                          <ListItemText primary={submenu.label} />
                        </ListItemButton>
                      ))}
                    </List>
                  </Collapse>
                </>
              ) : (
                <Link href={href} style={{ width: '100%' }}>
                  <ListItemButton sx={{ paddingX: 5 }}>
                    <ListItemText primary={label} />
                  </ListItemButton>
                </Link>
              )}
            </ListItem>
          </div>
        ))}
      </List>
      <Divider />
    </Box>
  );
};

export default MobileMenu;
