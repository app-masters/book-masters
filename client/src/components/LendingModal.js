import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import api from '../services/api';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import ConfirmLending from './ConfirmLending';

const LendingModal = (props) => {
  const [open, setOpen] = useState(false);

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

  const handleAction = () => {
    setOpen(true);
  };

  const handleScan = async (data) => {
    try {
      if (data === 'https://appmasters.io') {
        const response = await api.get(`/lendings/lend/${props.bookId}`);
        if (response.status === 200) {
          handleSnack('success', 'Livro pego com sucesso!');
        }
      } else {
        handleSnack('error', 'QRCode inválido');
      }
    } catch (err) {
      handleSnack('error', 'Ocorreu um erro durante a requisição');
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
        Pegar livro
      </Button>
      <ConfirmLending
        open={open}
        onClose={() => setOpen(false)}
        handleError={(data) => console.log('handleError', data)}
        handleScan={handleScan}
      />
      <Snackbar open={snackOpen} autoHideDuration={6000} onClose={closeSnack}>
        <Alert onClose={closeSnack} severity={request.type}>
          {request.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default LendingModal;
