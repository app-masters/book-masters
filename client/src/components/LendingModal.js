import React, { useState } from 'react';
import { Button, Grid } from '@material-ui/core';
import api from '../services/api';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import ConfirmLending from './ConfirmLending';
import moment from 'moment';

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
        const response = await api.get(
          `/lendings/${props.type === 'return' ? 'return' : 'lend'}/${
            props.bookId
          }`
        );
        if (response.status === 200) {
          handleSnack(
            'success',
            `Livro ${
              props.type === 'return' ? 'retornado' : 'pego'
            } com sucesso!`
          );
          if (props.callback) {
            props.callback();
          }
        }
      } else {
        handleSnack('error', 'QRCode inválido');
      }
    } catch (err) {
      console.log('lending error: ', err);
      handleSnack('error', 'Ocorreu um erro durante a requisição');
    }
  };

  const handleStatus = () => {
    const isReserve = props.type !== 'return';

    if (isReserve) {
      const haveDelay = moment().isAfter(
        moment(props.lending.reservationEndAt)
      );
      if (haveDelay) {
        return (
          <Alert severity="error">
            A reserva deste livro se encontra em atraso - Previsto para{' '}
            {moment(moment(props.lending.reservationEndAt)).format(
              'DD/MM/YYYY'
            )}
          </Alert>
        );
      } else {
        return (
          <Alert severity="info">
            Você tem até{' '}
            {moment(props.lending.reservationEndAt).format('DD/MM/YYYY')}{' '}
            para pegar esse livro
          </Alert>
        );
      }
    } else {
      const haveDelay = moment().isAfter(moment(props.lending.lendingEndAt));
      if (haveDelay) {
        return (
          <Alert severity="error">
            A entrega deste livro se encontra em atraso - Previsto para{' '}
            {moment(moment(props.lending.lendingEndAt)).format('DD/MM/YYYY')}
          </Alert>
        );
      }
    }
  };

  return (
    <>
      <Grid container direction="column" alignItems="flex-end" spacing={2}>
        <Grid item>
          <Button
            size="large"
            variant="contained"
            color="primary"
            onClick={handleAction}
          >
            {props.type === 'return' ? 'Devolver livro' : 'Pegar livro'}
          </Button>
        </Grid>
        <Grid item>{handleStatus()}</Grid>
      </Grid>

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
