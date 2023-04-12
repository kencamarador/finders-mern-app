import * as React from 'react';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext'
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
import AdbIcon from '@mui/icons-material/Adb';
import Logo from './Logo';
import { Link } from 'react-router-dom';
import { Divider } from '@mui/material';

const pages = ['Products', 'Pricing', 'Blog'];



function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const toolbarStyle = {
    minHeight: '105px',
  };
  const { logout } = useLogout()
  const { user } = useAuthContext()
  const handleClick = () => {
    logout()



  }
  return (
    <AppBar position="static" style={{ backgroundColor: "#FFFFFF", color: "#0A5" }}   >
      <Container maxWidth="l">
      <Toolbar style={toolbarStyle}>
          <Logo />

          <Typography style={{ marginLeft: 16 }}
          
            variant="h4"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'BlinkMacSystemFont',
              fontWeight: 700,
              letterSpacing: '.2rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Finder
          </Typography>
      
          <Typography style={{ marginLeft: 16 }}
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'BlinkMacSystemFont',
              fontWeight: 700,
              letterSpacing: '.2rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Finder
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          </Box>
          {/* {user && (
            <div>
              <span>{user.email}</span>
            </div>
          )}
          {!user && (
            <div>
            </div>
          )} */}
          
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
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
                <Typography textAlign="center"></Typography>
                </MenuItem>
                {user && (
                <div>
                <MenuItem  >
                <Typography textAlign="center">Signed in with: {user.email}</Typography>
                </MenuItem>
                <MenuItem component={Link} to="/">
                <Typography textAlign="center">All Jobs</Typography>
                </MenuItem>
                <MenuItem component={Link} to="/profile">
                <Typography textAlign="center">My Ads</Typography>
                </MenuItem>
                <MenuItem component={Link} to="/create">
                <Typography textAlign="center">Add Jobs</Typography>
                </MenuItem>
                <Divider sx={{ borderBottomWidth: 3, mt: 2 }}/>
                <MenuItem onClick={logout}>
                <Typography textAlign="center">Log Off</Typography>
                </MenuItem>
                </div>
  
                )}
                {!user && (
                <div>
                <MenuItem component={Link} to="/login">
                <Typography textAlign="center">Log In</Typography>
                </MenuItem>
                <MenuItem component={Link} to="/register">
                <Typography textAlign="center">Register</Typography>
                </MenuItem>
                </div>
                )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;





