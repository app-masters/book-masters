import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Button,
  Drawer,
  ListItem,
  ListItemText,
  IconButton,
  Typography,
} from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import { navbar } from '../assets/css/makeStyles';
import { useAuth } from '../lib/auth';
import { useHistory } from 'react-router-dom';
import useWindowSize from '../utils/useWindowSize';
import { Menu } from '@material-ui/icons';

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const classes = navbar();
  const { auth, signout } = useAuth();
  const history = useHistory();
  const size = useWindowSize();

  const handleLogout = () => {
    signout();
    history.push('/');
  };

  const changePlace = (to) => {
    history.push(to);
    setOpen(false);
  };

  return (
    <AppBar position="sticky" className={classes.appBar}>
      {size.compact ? (
        <Toolbar>
          <Typography variant="h6">Book Masters</Typography>
          <IconButton
            color="inherit"
            aria-label="menu"
            style={{ marginLeft: 'auto' }}
            onClick={() => setOpen(true)}
          >
            <Menu />
          </IconButton>
        </Toolbar>
      ) : (
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
          {!auth ? (
            <Button
              component={RouterLink}
              to="/login"
              size="large"
              className={classes.btn}
            >
              Entrar
            </Button>
          ) : (
            <Button
              component={RouterLink}
              to="/reserves"
              size="large"
              className={classes.btn}
            >
              Minhas reservas
            </Button>
          )}
          {auth && auth.user.role === 'admin' && (
            <Button
              component={RouterLink}
              to="/all-reserves"
              size="large"
              className={classes.btn}
            >
              Todas as reservas
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
            <Button
              size="large"
              className={classes.btnExit}
              variant="outlined"
              onClick={handleLogout}
            >
              Sair
            </Button>
          )}
        </Toolbar>
      )}

      <Drawer
        anchor={'left'}
        PaperProps={{
          style: {
            width: 280,
            backgroundColor: '#19affb',
            color: '#FFFFFF',
            paddingTop: 32,
          },
        }}
        open={open}
        onClose={() => setOpen(false)}
      >
        <ListItem button onClick={() => changePlace('/')}>
          <ListItemText primary={'Inicio'} />
        </ListItem>
        {auth && auth.user.role === 'admin' && (
          <ListItem button onClick={() => changePlace('/register')}>
            <ListItemText primary={'Registrar livro'} />
          </ListItem>
        )}
        {!auth ? (
          <ListItem button onClick={() => changePlace('/login')}>
            <ListItemText primary={'Entrar'} />
          </ListItem>
        ) : (
          <ListItem button onClick={() => changePlace('/reserves')}>
            <ListItemText primary={'Minhas reservas'} />
          </ListItem>
        )}
        <ListItem button onClick={() => changePlace('/about')}>
          <ListItemText primary={'Sobre'} />
        </ListItem>
        {auth && (
          <ListItem button onClick={handleLogout}>
            <ListItemText primary={'Sair'} />
          </ListItem>
        )}
      </Drawer>
    </AppBar>
  );
};

export default Navbar;
