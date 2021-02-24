import React, { useState, useEffect, useCallback } from 'react';
import {
  Grid,
  Typography,
  TextField,
  Button,
  FormHelperText,
} from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import ConfirmLending from '../components/ConfirmLending';
import NotRegisteredDialog from '../components/NotRegisteredDialog';
import { product } from '../assets/css/makeStyles';
import AlertSnackbar from '../components/AlertSnackbar';
import { Link as RouterLink } from 'react-router-dom';
import moment from 'moment';
import api from '../services/api';

import InputAdornment from '@material-ui/core/InputAdornment';
import DetailedBookCard from '../components/DetailedBookCard';
import LendingCard from '../components/LendingCard';
import fetchUserAppMasters from '../services/appMastersAPI';
import preprocessEmail from '../utils/preprocessEmail';

export const Product = (props) => {
  const [, setError] = useState(undefined);
  const [, setClicked] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [email, setEmail] = useState('');

  const [notRegisteredDialog, setNotRegisteredDialog] = useState(false);
  const [borrowingCompleteDialog, setBorrowingCompleteDialog] = useState(false);
  const [borrowingSuccessful, setBorrowingSuccessfulDialog] = useState(false);
  const [borrowingError, setBorrowingError] = useState(false);
  const [user, setUser] = useState(null);
  const [details] = useState(props.location.state);
  const [id] = useState(props.location.state._id);
  const [lendings, setLendings] = useState([]);
  const [formOpt, setFormOpt] = useState('');

  const [showForm, setShowForm] = useState(false);

  const classes = product();

  const getLendings = useCallback(async () => {
    try {
      const response = await api.get('/lendings/book/' + id);
      if (response.status !== 200) {
        throw Error(response.statusText);
      }
      const json = response.data;
      setLendings(json.lendings);
    } catch (error) {
      console.log('Error getting leadings', error);
    }
  }, [id]);

  useEffect(() => {
    getLendings();
  }, [id, getLendings]);

  const lendBook = async (apiData) => {
    try {
      const response = await api.post(`/lendings/`, apiData);
      if (response.status !== 200) {
        throw new Error('Não foi possível realizar o empréstimo');
      }
      getLendings();
      setBorrowingSuccessfulDialog(true);
      setBorrowingError(false);
    } catch (error) {
      setBorrowingSuccessfulDialog(false);
      setBorrowingError(true);
      throw error;
    }
  };

  const reserveBook = async (apiData) => {
    try {
      const response = await api.post(`/lendings/reserve`, apiData);
      if (response.status !== 200) {
        throw new Error('Não foi possível realizar a reserva');
      }
      getLendings();
      setBorrowingSuccessfulDialog(true);
      setBorrowingError(false);
    } catch (error) {
      setBorrowingSuccessfulDialog(false);
      setBorrowingError(true);
      throw error;
    }
  };

  const returnBook = async (apiData) => {
    try {
      const response = await api.post(`/lendings/return`, apiData);
      if (response.status !== 200) {
        throw new Error('Não foi possível realizar a devolução');
      }
      setBorrowingSuccessfulDialog(true);
      setBorrowingError(false);
    } catch (error) {
      setBorrowingSuccessfulDialog(false);
      setBorrowingError(true);
      throw error;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (preprocessEmail(event.target.value)) {
      setEmailError(false);
    } else {
      setEmailError(true);
      return;
    }
    try {
      const user = await fetchUserAppMasters(email);
      const userData = {
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
      };
      setBorrowingCompleteDialog(true);
      setUser(userData);
      if (formOpt === 'reservar') {
        reserveBook({
          id_book: id,
          person: user,
        });
      }
    } catch (error) {
      if (error.message === '404') {
        setNotRegisteredDialog(true);
      }
      setError(error);
    }
  };

  const handleCloseDialog = () => {
    setNotRegisteredDialog(false);
  };

  const handleCloseDialogBorrowing = () => {
    setBorrowingCompleteDialog(false);
  };

  const handleConfirmBorrowing = () => {
    setClicked(true);
  };

  const handleReturnQRCode = () => {
    setClicked(false);
  };

  const handleScan = (data) => {
    if (data === 'https://appmasters.io') {
      isValid();
      setClicked(false);
      setBorrowingCompleteDialog(false);
    }
  };

  const isValid = async () => {
    const apiData = {
      id_book: id,
      person: user,
    };

    try {
      if (formOpt === 'pegar') {
        await lendBook(apiData);
      } else if (formOpt === 'devolver') {
        await returnBook(apiData);
      }
    } catch (error) {
      setClicked(false);
      setBorrowingCompleteDialog(false);
      setBorrowingSuccessfulDialog(false);
      setBorrowingError(true);
    }

    setClicked(false);
    setBorrowingCompleteDialog(true);
    setBorrowingSuccessfulDialog(true);
  };

  const handleCloseAlert = () => {
    setBorrowingSuccessfulDialog(false);
    setBorrowingError(false);
  };

  const handleQRCodeError = () => {
    setBorrowingError(true);
  };

  const handleEmailInput = (val) => {
    setEmail(val.target.value.trim().toLowerCase());
  };

  moment.locale('pt-BR');

  const form = (option) => {
    return (
      <>
        <Grid item xs={8} lg={8} md={8}>
          <form
            id="actionForm"
            onSubmit={handleSubmit.bind(this)}
            style={{ marginBottom: '40px' }}
          >
            <Grid container spacing={3} direction="column" alignItems="center">
              <Grid item>
                <Typography variant="h5">
                  Deseja {formOpt} esse livro?
                </Typography>
              </Grid>
              <Grid item xs={12} style={{ width: '70%' }}>
                <TextField
                  id="standard-secondary"
                  label="E-mail"
                  variant="outlined"
                  type="text"
                  name="email"
                  value={email}
                  error={emailError}
                  onChange={(e) => handleEmailInput(e)}
                  required
                  className={classes.textField}
                  placeholder="Insira seu email"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <MailOutlineIcon />
                      </InputAdornment>
                    ),
                  }}
                />
                {emailError && (
                  <FormHelperText error id="component-error-text">
                    Email inválido.
                  </FormHelperText>
                )}
              </Grid>
              <Grid item>
                <Button
                  className={classes.buttonOutlined}
                  type="submit"
                  variant="outlined"
                >
                  {formOpt}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
        <Grid item xs={12} lg={4} md={4}>
          <LendingCard lendings={lendings} />
        </Grid>
      </>
    );
  };

  const setForm = (opt) => {
    setShowForm(!showForm);
    setFormOpt(opt);
  };

  const checkUser = () => {
    if (user && formOpt !== 'reservar') {
      return (
        <ConfirmLending
          open={borrowingCompleteDialog}
          onClose={handleCloseDialogBorrowing}
          onConfirm={handleConfirmBorrowing}
          name={user.name}
          handleReturnQRCode={handleReturnQRCode}
          handleError={handleQRCodeError}
          handleScan={handleScan}
          formOpt={formOpt}
        />
      );
    } else {
      return (
        <NotRegisteredDialog
          open={notRegisteredDialog}
          onClose={handleCloseDialog}
        />
      );
    }
  };

  const userActions = () => {
    if (details.status === 'Reservado') {
      return (
        <Button
          className={classes.buttonOutlined}
          onClick={() => setForm('pegar')}
          variant="outlined"
        >
          Pegar
        </Button>
      );
    } else if (details.status === 'Emprestado') {
      return (
        <Button
          className={classes.buttonOutlined}
          onClick={() => setForm('devolver')}
          variant="outlined"
        >
          Devolver
        </Button>
      );
    }
  };

  return (
    <Grid container className={classes.container} spacing={3}>
      {checkUser()}
      <Grid item xs={12}>
        <Button
          component={RouterLink}
          to="/"
          size="large"
          color="primary"
          className={classes.button}
          startIcon={<ArrowBackIosIcon />}
        >
          Voltar
        </Button>
      </Grid>
      <Grid item xs={12} lg={12} md={12}>
        <DetailedBookCard book={details} />
      </Grid>
      <Grid container justify="space-around" style={{ display: 'flex' }}>
        <Button
          className={classes.buttonOutlined}
          onClick={() => setForm('reservar')}
          variant="outlined"
        >
          Reservar
        </Button>
        {userActions()}
      </Grid>
      {showForm && form()}

      <AlertSnackbar
        open={borrowingError || borrowingSuccessful}
        onClose={handleCloseAlert.bind(this)}
        severity={borrowingError ? 'error' : 'success'}
        message={
          borrowingError
            ? 'Não foi possível completar sua requisição.'
            : 'Sucesso!'
        }
      />
    </Grid>
  );
};

export default Product;
