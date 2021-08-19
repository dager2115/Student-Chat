import React, { useEffect, useState } from 'react';
import { AppBar, Avatar, Container, Grid, IconButton, Toolbar, Typography } from '@material-ui/core';
import { NavLink } from 'react-router-dom'
import { useStyles } from './styles/styles.js';
import decode from "jwt-decode";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PeopleIcon from '@material-ui/icons/People';
import ClassIcon from '@material-ui/icons/Class';
import socket from '../socket.js';

export default function Header() {
  console.log(window.screen)
  const classes = useStyles();
  const user = sessionStorage.getItem('data')
  const userName = user && decode(user).userName
  const userRole = user && decode(user).userRole
  const [width, setWidth] = useState(0)

  const logOut = () => {
    socket.emit('desconectado', userName)
    sessionStorage.clear()
    window.location.replace('/')
  }

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth)
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <AppBar position="static">
      <Toolbar className={classes.header}>
        <Container className={classes.toolContainer}>
          <Grid item sm={4} lg={4} className={classes.titleContainer}>
            <Typography variant="h4" className={classes.title}>
              Student Chat
            </Typography>
          </Grid>
          {
            (userRole === "Moderador" && width >= 768) &&
            <Grid item sm={4} lg={4} className={classes.navigation}>
              <NavLink className={classes.link} to="/chatHistory">Usuarios</NavLink>
              <NavLink className={classes.link} to="/home">Clase</NavLink>
            </Grid>
          }{
            (userRole === "Moderador" && width < 768) &&
            <Grid item sm={4} lg={4} className={classes.navigation}>
              <IconButton href="/chatHistory" style={{ color: "#fff" }}><PeopleIcon fontSize="large" /></IconButton>
              <IconButton href="/home" style={{ color: "#fff" }}><ClassIcon fontSize="large" /></IconButton>
            </Grid>
          }
          {user && width >= 768 &&
            <Grid item sm={4} lg={4} className={classes.user}>
              <Avatar className={classes.avatar}>
              </Avatar>
              <Typography component="h1" variant="h5" style={{ color: "white" }}>
                {userName}
              </Typography>
              <IconButton onClick={logOut}>
                <ExitToAppIcon fontSize="large" style={{ color: "#fff" }} />
              </IconButton>
            </Grid>
          }{
            user && width < 768 &&
            <Grid item sm={4} lg={4} className={classes.user}>
              <IconButton onClick={logOut}>
                <ExitToAppIcon fontSize="large" style={{ color: "#fff" }} />
              </IconButton>
            </Grid>
          }
        </Container>
      </Toolbar>
    </AppBar>
  )
}
