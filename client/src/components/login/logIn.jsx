import React from 'react';
import { Avatar, Button, Container, Grid, TextField, Typography, Link } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert'        
import { useStyles } from './styles/styles'
import { useDispatch, useSelector } from 'react-redux';
import { userLogin } from "../../redux/loginReducer/loginAction";
import { Redirect } from 'react-router';

export const validate = (input) => {
    let errors = {};
    if (!input.userName) {
      errors.userName = 'Debes ingresar un usuario';
    }
    if (!input.password) {
      errors.password = 'Debes ingresar una contraseña';
    }
    return errors;
  };

export default function LogIn() {

    const user = sessionStorage.getItem('data')
    const [userData, setUserData] = React.useState({ userName: "", password: "" });
    const [errors, setErrors] = React.useState({});
    const loginFailed = useSelector(store => store.loginReducer.loginFailed)
    const dispatch = useDispatch();
    const classes = useStyles();

    const handleSubmit = async (event) => {
        event.preventDefault();
        await setUserData({...userData,
          [event.target.name]: event.target.value
        });
    
        handleChange(event);
        
        if (Object.keys(errors).length === 0) {
          dispatch(userLogin(userData.userName, userData.password))
        }
        setUserData({ userName: "", password: "" });
      };
    
      const handleChange = (event) => {
        setErrors(validate({...userData,
          [event.target.name]: event.target.value
        }))
      
        setUserData({...userData,
          [event.target.name]: event.target.value
        });
      };
  
    return (
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
          </Avatar>
          <Typography component="h1" variant="h5">
            Iniciar sesión
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="userName"
              label="Nombre de ususario"
              name="userName"
              autoFocus
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
            <Grid item xs>
                 {loginFailed && <Alert severity="error">
                 Los datos ingresados son incorrectos </Alert>}
              </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Iniciar sesion
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/signIn" variant="body2">
                  {"No tienes cuenta? registrate"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        {user&&<Redirect to='/home'/>}
      </Container>
    );
  }
