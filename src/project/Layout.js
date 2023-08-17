import * as React from "react";
import { useState } from 'react';
import { NavLink, Outlet } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";

import logo from "./imeges/logo.png";
import road from "./imeges/pexels-max-andrey-1197095.jpg";
import LogoutSharpIcon from '@mui/icons-material/LogoutSharp';

export default function Layout(props) {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

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

  return (
    <Box sx={{ background: "#ecf2f9", minHeight: '100vh', backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <AppBar position="fixed" sx={{ backgroundColor: '#f2f2f2', color: 'rgb(179, 0, 0)', border: '1px solid rgb(179, 0, 0)', boxShadow: '5px solid rgb(179, 0, 0)' }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <NavLink to={"/"} style={{ textDecoration: "none" }}>
              <Box sx={{ display: { xs: 'none', md: 'flex' }, marginRight: 1 }}>
                <img src={logo} alt="Logo" height="50" />
              </Box>
            </NavLink>
            <NavLink to={"/"} style={{ textDecoration: "none" }}>
              <Typography
                variant="h6"
                noWrap
                component="a"
                sx={{
                  marginRight: 2,
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  fontFamily: "cursive",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "primary.dark",
                  textDecoration: "none"
                }}
              >
                RidePals
              </Typography>
            </NavLink>
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left"
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left"
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" }
                }}
              >
                <NavLink to='/myRide' style={{ textDecoration: 'none', color: 'inherit' }}>
                  <MenuItem key={"נסיעה "}>
                    <Typography textAlign="center">הנסיעות שלי</Typography>
                  </MenuItem>
                </NavLink>
              </Menu>
            </Box>
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }, justifyContent: 'center', alignItems: 'center' }}>
              <NavLink to={"/"} style={{ textDecoration: "none" }}>
                <Box sx={{ display: { xs: 'flex', md: 'none' }, marginRight: 1 }}>
                  <img src={logo} alt="Logo" height="70" />
                </Box>
              </NavLink>
              <NavLink to={"/"} style={{ textDecoration: "none" }}>
                <Typography
                  variant="h4"
                  noWrap
                  component="a"
                  href="/"
                  sx={{
                    mr: 2,
                    display: { xs: "flex", md: "none" },
                    flexGrow: 1,
                    fontFamily: "cursive",
                    fontWeight: 700,
                    letterSpacing: ".3rem",
                    color: "primary.dark",
                    textDecoration: "none"
                  }}
                >
                  RidePals
                </Typography>
              </NavLink>
            </Box>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              <NavLink to='/myRide' style={{ textDecoration: 'none', color: 'inherit' }}>
                <Typography textAlign="center">הנסיעות שלי</Typography>
              </NavLink>
            </Box>
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar src={props.user.picture_url} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <NavLink to="/profile" style={{ textDecoration: 'none', color: 'inherit' }}>
                  <MenuItem onClick={() => setAnchorElUser(null)}>
                    <Typography textAlign="center">פרופיל</Typography>
                  </MenuItem>
                </NavLink>
                <NavLink to="/friends" style={{ textDecoration: 'none', color: 'inherit' }}>
                  <MenuItem onClick={() => setAnchorElUser(null)}>
                    <Typography textAlign="center">חברים</Typography>
                  </MenuItem>
                </NavLink>
                <Tooltip title="התנתקות">
                  <MenuItem onClick={() => {
                    localStorage.clear();
                    window.open('/', '_self');
                  }}>
                    <LogoutSharpIcon />
                  </MenuItem>
                </Tooltip>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Box marginTop={8}>
        <Outlet />
      </Box>
    </Box>
  );
}
