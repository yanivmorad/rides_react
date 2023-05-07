import * as React from "react";
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
import { useEffect, useState } from 'react';
import AdbIcon from "@mui/icons-material/Adb";
import { Link, NavLink, Navigate, Outlet, useLocation } from "react-router-dom";
import logo from "./logo.png"
import Home from "./Home";

export default function Layout(props){
  const currLocation = useLocation()
  

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
      setAnchorElUser(null);}
    


    return(
      <Box>
<AppBar position="static" sx={{ backgroundColor: '#d9d9d9', color: '#611f61', border: '4px solid #611f61' }}>      <Container maxWidth="xl">
        <Toolbar disableGutters>
        
        {/* <img src={logo} alt="Logo" height="50" sx={{ mr: 2, display: { xs: "none", md: "flex"} }} /> */}


        <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "cursive",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "#ffdb4d",
              textDecoration: "none"
            }}
          >
            ride app
          </Typography>

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
               
                <MenuItem key={"Asks"} onClick={handleCloseNavMenu}>
              
                  <Typography  textAlign="center">{"ask"}
                  
                  </Typography>
                </MenuItem>
                <NavLink to="/Offer" >
  <MenuItem key={"נסיעה "}>
    <Typography textAlign="center">{"offers"}</Typography>
  </MenuItem>
</NavLink>
                
              
            </Menu>
          </Box>
          <img src={logo} alt="Logo" height="50"sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />

          <Typography
            variant="h4"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "cursive",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "#ffdb4d",
              textDecoration: "none"
            }}
          >
            ride app
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              <Button
                 key={"Asks"}
                 onClick={handleCloseNavMenu}
                 sx={{ my: 2, color: "white", display: "block" }}
              >
                {"Asks"}
              </Button>
 
    
             
<Button
  onClick={handleCloseNavMenu}
  sx={{ my: 2, color: "white", display: "block" }}
>
<NavLink to="/Offer"  style={{ my: 2, color: "white", display: "block" }}>
  {"Offers"}
</NavLink>

</Button>

           
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

<MenuItem onClick={()=>setAnchorElUser(null)}>
  <NavLink to="/profile">
    <Typography textAlign="center">Profile</Typography>
  </NavLink>
</MenuItem>

<MenuItem onClick={()=>setAnchorElUser(null)} >
  <Typography textAlign="center">Account</Typography>
</MenuItem>
<MenuItem onClick={()=>{localStorage.clear()
  window.open('/', '_self');
}}>
  <Typography textAlign="center">Logout</Typography>
</MenuItem>

            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
   
   <Outlet />
   </Box>
   
  
    
    )
}