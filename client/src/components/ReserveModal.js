import React, { useState } from 'react';
import { Button, Typography } from '@material-ui/core';
import { useAuth } from '../lib/auth';
import Modal from '@material-ui/core/Modal';
import FormLogin from './FormLogin';
import { modal } from '../assets/css/makeStyles';
import api from '../services/api';

const ReserveModal = ({ bookId, handleSnack, callback }) => {
  const { auth } = useAuth();
  const [open, setOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const classes = modal();

  const handleClose = () => setOpen(false);

  const doReserveBook = async () => {
    try {
      const response = await api.get(`/lendings/reserve/${bookId}`);
      if (response.status === 200) {
        handleSnack('success', 'Livro reservado com sucesso!');
        if (callback) {
          callback(response.data);
        }
      }
    } catch (err) {
      if (err.response) {
        handleSnack(
          'error',
          err?.response?.data?.error?.message ||
            'Não foi possível reservar o livro'
        );
      } else handleSnack('error', 'Ocorreu um erro durante a requisição');
    }
  };

  const handleAction = () => {
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
    </>
  );
};

export default ReserveModal;
