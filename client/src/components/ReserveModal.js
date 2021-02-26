import React, { useState } from 'react';
import { Button, Typography } from '@material-ui/core';
import { useAuth } from '../lib/auth';
import Modal from '@material-ui/core/Modal';
import FormLogin from './FormLogin';
import { modal } from '../assets/css/makeStyles';
import api from '../services/api';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

const ReserveModal = (props) => {
  const { auth } = useAuth();
  const [open, setOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [request, setRequest] = useState({ type: '', message: '' });

  const [snackOpen, setSnackOpen] = useState(false);

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

  const classes = modal();

  const handleClose = () => setOpen(false);

  const doReserveBook = async () => {
    try {
      const response = await api.get(`/lendings/reserve/${props.bookId}`);
      if (response.status === 200) {
        handleSnack('success', 'Livro reservado com sucesso!');
        if (props.callback) props.callback();
      }
    } catch (err) {
      if (err.response) {
        handleSnack('error', err?.response?.data?.error);
      } else handleSnack('error', 'Ocorreu um erro durante a requisição');
    }
  };

  const handleAction = () => {
    // User not logged them display login
    if (!auth) {
      setModalContent(
        <FormLogin
          callback={() => {
            setOpen(false);
            setTimeout(() => {
              doReserveBook();
            }, 1000);
          }}
        />
      );
      setOpen(true);
    } else {
      doReserveBook();
    }
  };

  return (
    <>
      <Button
        size="large"
        variant="contained"
        color="primary"
        onClick={handleAction}
      >
        Reservar
      </Button>
      <Modal
        open={open}
        className={classes.modal}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div className={classes.content}>
          <Typography className={classes.title}>
            Para continuar você precisa estar autenticado
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

export default ReserveModal;
