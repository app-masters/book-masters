import React from 'react';
import { AppBar, Toolbar, Button } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import { navbar } from '../assets/css/makeStyles';
import { useAuth } from '../lib/auth';
import { useHistory } from 'react-router-dom';

const Navbar = () => {
  const classes = navbar();
  const { auth, signout } = useAuth();
  const history = useHistory();

  const handleLogout = () => {
    signout();
    history.push('/');
  };

  return (
    <AppBar position="sticky" className={classes.appBar}>
      <Toolbar>
        <Button
          component={RouterLink}
          to="/"
          size="large"
          className={classes.btn}
        >
          Book Masters
        </Button>
        {auth && auth.user.role === 'admin' && (
          <Button
            component={RouterLink}
            to="/register"
            size="large"
            className={classes.btn}
          >
            Registrar livro
          </Button>
        )}
        {!auth && (
          <Button
            component={RouterLink}
            to="/login"
            size="large"
            className={classes.btn}
          >
            Entrar
          </Button>
        )}
        <Button
          component={RouterLink}
          to="/about"
          size="large"
          className={classes.btn}
        >
          Sobre
        </Button>
        {auth && (
          <Button size="large" className={classes.btn} onClick={handleLogout}>
            Sair
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
