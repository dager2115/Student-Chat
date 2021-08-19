import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import Header from './components/header/header';
import ClassChat from './components/streamAndChat/classChat';
import LogIn from './components/login/logIn'
import { CssBaseline } from '@material-ui/core';
import SignInForm from './components/signInForm/SignInForm';

var theme = createTheme({
  palette: {
    primary: {
      light:"#FFB74D",
      main: "#FF9800",
      darker: "#F57C00",
    },
    secondary: {
      light: "#FF8A65",
      main: "#FF5722",
      darker: "#E64A19",
    },
    background:{
      default: "#fff"
    },
  },
  typography:{
    fontFamily: "Tahoma"
  }
});

function App() {
 const user = sessionStorage.getItem('data')
  return (
    <BrowserRouter>
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <Header/>
      <Switch>
      <Route exact path="/" component={LogIn}/>
      <Route path='/home' component={ClassChat}/>
      <Route path='/signIn' component={SignInForm}/>
      {!user&&<Redirect to='/'/>}
      </Switch>
    </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
