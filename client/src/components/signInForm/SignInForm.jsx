import { Button, Container, TextField, Typography } from '@material-ui/core';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { createUser } from '../../redux/userReducer/userActions';
import { useStyles } from './styles/styles';

const validate = (input) => {
    let errors = {};
    if (!input.name) {
        errors.name = 'Debes ingresar tu nombre completo';
    }
    if (!input.userName) {
      errors.userName = 'Debes ingresar un usuario';
    }
    if (!input.password) {
      errors.password = 'Debes ingresar una contraseña';
    }
    if (!input.confirmPassword) {
        errors.confirmPassword = 'Debes confirmar tu contraseña';
    }
    if (input.password !== input.confirmPassword) {
        errors.confirmPassword = 'las contraseñas no coinciden';
    }
    return errors;
  };

export default function LogIn() {

    const [userData, setUserData] = useState({ 
        name: "",
        userName: "", 
        password: "",
        confirmPassword:"" 
    });
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();
    const classes = useStyles();

    const handleSubmit = async (event) => {
        event.preventDefault();
        await setUserData({...userData,
          [event.target.name]: event.target.value
        });
    
        handleChange(event);
        
        if (Object.keys(errors).length === 0) {
            dispatch(createUser(userData))
            setUserData({ 
                name: "",
                userName: "", 
                password: "",
                confirmPassword:"" 
            });
        }
    };
    
      const handleChange = (event) => {
        setUserData({...userData,
          [event.target.name]: event.target.value
        });
        setErrors(validate({...userData,
          [event.target.name]: event.target.value
        })) 
      };


    return(
        <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Regístrate
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                id="name"
                label="Nombre completo"
                name="name"
                autoFocus
                error={!!errors.name}
                value={userData.name}
                helperText={errors.name}
                onChange={handleChange}
              />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="userName"
              label="Nombre de ususario"
              name="userName"
              error={!!errors.userName}
              value={userData.userName}
              helperText={errors.userName}
              onChange={handleChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              name="password"
              label="Contraseña"
              type="password"
              id="password"
              error={!!errors.password}
              value={userData.password}
              helperText={errors.password}
              onChange={handleChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              name="confirmPassword"
              label="Contraseña"
              type="password"
              id="confirmPassword"
              error={!!errors.confirmPassword}
              value={userData.confirmPassword}
              helperText={errors.confirmPassword}
              onChange={handleChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              registrarse
            </Button>
          </form>
        </div>
      </Container>
    )
}
