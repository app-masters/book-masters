import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogActions,
  DialogContentText,
  DialogTitle,
  Container,
  Button,
  TextField,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../lib/auth';
import api from '../services/api';

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  container: {
    display: 'flex',
    alignItems: 'center',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const FormLogin = ({ callback }) => {
  const classes = useStyles();
  const history = useHistory();
  const { auth, signin } = useAuth();

  const [loading, setLoading] = useState(false);
  const [showDialog, setDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');
  const [values, setValues] = useState({
    email: '',
  });

  useEffect(() => {
    if (auth) {
      if (callback) {
        callback();
      } else {
        history.push('/');
      }
    }
  }, [auth, callback, history]);

  const doLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const responseBackend = await api.post('/login', { email: values.email });
      if (responseBackend.status === 200) {
        signin(responseBackend.data);
      } 

    } catch (err) {
      if(err.response.status === 404 || err.response.status === 400)
        setDialogMessage(err.response.data);
      else
        setDialogMessage("Erro ao fazer login");

      setDialog(true);
      console.log('login error: ', err.response);
    }
    setLoading(false);
    
  };

  return (
    <Container className={classes.container} component="main" maxWidth="xs">
      <div className={classes.paper}>
        <form className={classes.form} onSubmit={doLogin}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="E-mail"
            name="email"
            type="email"
            autoComplete="email"
            disabled={loading}
            value={values.email}
            onChange={({ target }) => setValues({ email: target.value })}
            autoFocus
          />
          <Button
            type="submit"
            fullWidth
            disabled={loading}
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Entrar
          </Button>
        </form>
      </div>
      <Dialog open={showDialog} onClose={() => setDialog(true)}>
        <DialogTitle>{dialogMessage}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Para ter acesso ao Book masters você precisa primeiro se registrar
            no{' '}
            <a
              href={'https://programador.emjuizdefora.com/'}
              target="_blank"
              rel="noopener noreferrer"
            >
              programadores de Juiz de Fora
            </a>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <a
            href={'https://programador.emjuizdefora.com/entrar'}
            style={{ textDecoration: 'none' }}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="contained" color="primary">
              Registrar agora
            </Button>
          </a>
          <Button onClick={() => setDialog(false)} color="primary">
            Fechar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default FormLogin;
