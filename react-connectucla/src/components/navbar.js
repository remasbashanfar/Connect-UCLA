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

export default function ButtonAppBar() {
  const {user} = useContext(AuthContext);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            UCLA Connect
          </Typography>
          <Button color="inherit" href="/addEvent">Add Event</Button>
          <Button color="inherit" href="/">Home</Button>
          <Button color="inherit" href="/about">About</Button>
          {!user && <Button color="inherit" href="/login">Login</Button>}
          {user && 
          <Link to={`/profile/${user.username}`}>
            <Avatar alt={user.username} src={user.profilePicture} />
          </Link>}
          <Button color="inherit" href="/maps">Maps</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}