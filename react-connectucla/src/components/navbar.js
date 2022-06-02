// From https://mui.com/material-ui/react-app-bar/

import * as React from 'react';
import {useContext} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { AuthContext } from "../context/AuthContext";
import Avatar from '@mui/material/Avatar';
import { Link } from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import {logoutCall} from "../services/loginCall"
import {useNavigate} from 'react-router-dom';
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';

export default function ButtonAppBar() {
  const Navigate = useNavigate();
  const {user, dispatch} = useContext(AuthContext);
  
  // logout user interface
  const handleLogout= (e)=>{
    e.preventDefault();
    logoutCall(dispatch);
    Navigate("/");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            UCLA Connect
          </Typography>
          {user && <Button color="inherit" href="/addEvent" startIcon={<AddBoxOutlinedIcon/>}>Add Event</Button>}
          <Button color="inherit" href="/" startIcon={<HomeOutlinedIcon/>}>Home</Button>
          <Button color="inherit" href="/feed" startIcon={<InfoOutlinedIcon/>}>Feed</Button>
          {!user && <Button color="inherit" href="/login" startIcon={<LoginOutlinedIcon/>}>Login</Button>}
          <Button color="inherit" href="/maps" startIcon={<MapOutlinedIcon/>}>Map</Button>
          {user && 
          <Link to={`/profile/${user.username}`}>
            <Avatar alt={user.username} src={user.profilePicture ? user.profilePicture : 
              require('../pages/profile/images/bruin-bear.jpeg')} />
          </Link>}
          {user && <Button color="inherit" startIcon={<LogoutIcon />} onClick={handleLogout}>
              Log Out</Button>}
        </Toolbar>
      </AppBar>
    </Box>
  );
}