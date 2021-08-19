import { Grid } from '@material-ui/core';
import React from 'react';
import Chat from './chat';
import ReactPLayer from 'react-player'
import { useStylesClassChat } from './styles/styles';
import './styles/media.css'
import { Redirect } from 'react-router';

export default function ClassChat (){
    const classes = useStylesClassChat()
    const user = sessionStorage.getItem('data')
    return (
        <Grid container className={classes.container}>
            {user===null&&<Redirect to='/'/>}
            <Grid item lg={9} sm={9} xs={12} className={classes.vimeo} id="video">
               <ReactPLayer
               url={'https://www.youtube.com/watch?v=QBLbXgeXMU8'}
               width="100%"
               height="100%"
               playing
               loop
               />
            </Grid>
            <Grid item lg={3} sm={3} xs={12} className={classes.chat} id="chat">
            <Chat/>
            </Grid>
        </Grid>
    )
}