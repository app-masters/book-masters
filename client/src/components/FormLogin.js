import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import fetchUserAppMasters from '../services/appMastersAPI';
import { useHistory } from 'react-router-dom';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useAuth } from '../lib/auth';

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

const FormLogin = () => {
  const classes = useStyles();
  const history = useHistory();
  const auth = useAuth();

  const [loading, setLoading] = useState(false);
  const [showDialog, setDialog] = useState(false);
  const [values, setValues] = useState({
    email: '',
  });

  const doLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const response = await fetchUserAppMasters(
      values.email.toLocaleLowerCase()
    );
    setLoading(false);
    if (response.status !== 200) {
      setDialog(true);
    } else {
      // TODO: Add more information...
      auth.signin({ email: values.email });
      history.push('/');
    }
  };

  return (
    <Container className={classes.container} component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Bem vindo
        </Typography>
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
        <DialogTitle>{'Não conseguimos encontrar seu email'}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Para ter acesso ao BOOK MASTERS você precisa primeiro se registrar
            no <a href={'https://programador.emjuizdefora.com/'}>DevFinder</a>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialog(false)} color="primary" autoFocus>
            Fechar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default FormLogin;
