import React, { useState } from 'react';
import { Button, Grid, Modal, Typography } from '@material-ui/core';
import api from '../services/api';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import moment from 'moment';
import { useAuth } from '../lib/auth';
import { modal } from '../assets/css/makeStyles';
import FormLogin from './FormLogin';

const AvailabilityModal = (props) => {
  const { auth } = useAuth();
  const [open, setOpen] = useState(false);
  const [request, setRequest] = useState({ type: '', message: '' });
  const [snackOpen, setSnackOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const date = moment(
    props.lending.lendingEndAt || props.lending.reservationEndAt
  );
  const classes = modal();

  const handleSnack = (type, message) => {
    setRequest({
      type,
      message,
    });
    setSnackOpen(true);
  };

  const closeSnack = () => {
    setSnackOpen(false);
    setRequest({ type: '', message: '' });
  };

  const handleAction = () => {
    if (!auth) {
      setModalContent(
        <FormLogin
          callback={() => {
            setOpen(false);
            setTimeout(() => {
              doNotify();
            }, 1000);
          }}
        />
      );
      setOpen(true);
    } else {
      doNotify();
    }
  };

  const handleClose = () => setOpen(false);

  const doNotify = async () => {
    try {
      const response = await api.get(`/notifyMe/${props.bookId}`);
      if (response.status === 200) {
        handleSnack(
          'success',
          'Quando o livro estiver disponível você será notificado!'
        );
        if (props.callback) props.callback();
      }
    } catch (err) {
      if (err.response) {
        handleSnack('error', err?.response?.data?.error);
      } else handleSnack('error', 'Ocorreu um erro durante a requisição');
    }
  };

  return (
    <>
      <Grid container direction="column" alignItems="flex-end" spacing={2}>
        {!props.watching && (
          <Grid item>
            <Button
              size="large"
              variant="contained"
              color="primary"
              onClick={handleAction}
            >
              Avise me quando chegar
            </Button>
          </Grid>
        )}
        <Grid item>
          {moment().isAfter(date) ? (
            <Alert severity="error">
              {props.watching && (
                <AlertTitle>
                  Você será notificado quando esteve livro retornar
                </AlertTitle>
              )}
              A reserva deste livro se encontra em atraso - Previsto para{' '}
              {moment(date).format('DD/MM/YYYY')}
            </Alert>
          ) : (
            <Alert severity="info">
              {props.watching && (
                <AlertTitle>
                  Você será notificado quando esteve livro retornar
                </AlertTitle>
              )}
              A data prevista para o retorno deste livro é{' '}
              {props.lending.lendingEndAt
                ? moment(props.lending.lendingEndAt).format('DD/MM/YYYY')
                : moment(props.lending.reservationEndAt)
                    .add(30, 'days')
                    .format('DD/MM/YYYY')}
            </Alert>
          )}
        </Grid>
      </Grid>
      <Modal
        open={open}
        className={classes.modal}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div className={classes.content}>
          <Typography component="h1" variant="h5">
            Informe o email a ser notificado
          </Typography>
          {modalContent}
        </div>
      </Modal>
      <Snackbar open={snackOpen} autoHideDuration={6000} onClose={closeSnack}>
        <Alert onClose={closeSnack} severity={request.type}>
          {request.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default AvailabilityModal;
