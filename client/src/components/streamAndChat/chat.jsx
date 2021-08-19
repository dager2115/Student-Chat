import { Grid, TextField, Typography, IconButton } from '@material-ui/core';
import decode from "jwt-decode";
import React, { useEffect, useRef, useState } from 'react';
import socket from '../socket'
import { useStylesChat } from './styles/styles';
import SendIcon from '@material-ui/icons/Send';
import axios from 'axios'

export default function Chat (){
    
    const divRef = useRef(null)
    const classes = useStylesChat()
    const [mensaje, setMensaje] = useState("")
    const [mensajes, setMensajes] = useState([])
    const user = sessionStorage.getItem('data')
    const userName = user&&decode(user).userName
    const userRole = user&&decode(user).userRole
    const hora = new Date().toString().slice(15, 21)

    useEffect(()=>{
        socket.emit('conectado', userName)
    },[userName])

    useEffect(() => {
        socket.on('mensajes', (message) => {
            setMensajes([...mensajes, message])
        })
        return ()=>{
            socket.off()
        }
    }, [mensajes])

    useEffect(()=>{
        divRef.current.scrollIntoView({ behavior: 'smooth'})
    })

    const onSubmit = (event) => {
        event.preventDefault()
        if(mensaje){
        axios.post('/messages/createMessage', {userName, message:mensaje})
        .then(response=>{
            socket.emit('mensaje', userName, mensaje, userRole, hora)
            setMensaje("")
        })
        }
        return
    }

    return (
        <Grid className={classes.chat}>
            <Grid container className={classes.messages}>
                {mensajes&&mensajes.map((element, index) => {
                 return (
                   <Grid key={index} item className={classes.message}>
                       <div className={classes.info}>
                       <div className={classes.name}>
                       <Typography variant="body1"  className={classes.username}>{element.userName}</Typography>
                       {(element.userRole==="Moderador" || element.userRole==="servidor")&&<Typography variant="p" className={classes.moderador}>{element.userRole}</Typography>}
                       {(element.userRole==="Estudiante")&&<Typography variant="p" className={classes.estudiante}>{element.userRole}</Typography>}
                       </div>
                       <Typography variant="caption" className={classes.hora}>{element.hora}</Typography>
                       </div>
                       <Typography variant="body1">{element.message}</Typography>
                   </Grid>
                )
                })}
                <div ref={divRef}></div>
            </Grid>
            <form onSubmit={onSubmit} className={classes.form}>
                <TextField
                color="secondary"
                className={classes.input}
                label="Ingrese su mensage"
                value={mensaje}
                onChange={event => setMensaje(event.target.value)}
                />
                <IconButton
                type="submit"
                >
                <SendIcon fontSize="large" color="primary"/>              
                </IconButton>
            </form>
        </Grid>
    )
}
