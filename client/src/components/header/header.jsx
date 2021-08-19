import React from 'react';
import { AppBar, IconButton, Toolbar, Typography } from '@material-ui/core';
import { useStyles } from './styles/styles.js';
import decode from "jwt-decode";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import socket from '../socket.js';

export default function Header (){
    const classes = useStyles();
    const user = sessionStorage.getItem('data')
    const userName = user&&decode(user).userName

    const logOut = () => {
      socket.emit('desconectado', userName)
      sessionStorage.clear()
      window.location.replace('/')
    }

    return(
        <AppBar position="static">
        <Toolbar className={classes.header}>
          <Typography variant="h4" className={classes.title}>
            Student Chat
          </Typography>
          {user&&<IconButton onClick={logOut}>
            <ExitToAppIcon fontSize="large" style={{color: "#fff"}}/>
          </IconButton>}
        </Toolbar>
      </AppBar>
    )
}
