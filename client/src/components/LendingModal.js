import React, { useState } from 'react';
import { Button, Grid } from '@material-ui/core';
import api from '../services/api';
import Alert from '@material-ui/lab/Alert';
import ConfirmLending from './ConfirmLending';
import moment from 'moment';

const LendingModal = ({ type, lending, bookId, callback, handleSnack }) => {
  const [open, setOpen] = useState(false);

  const handleAction = () => {
    setOpen(true);
  };

  const handleScan = async (data) => {
    try {
      if (data === 'https://books.appmasters.io') {
        setOpen(false);
        const response = await api.get(
          `/lendings/${type === 'return' ? 'return' : 'lend'}/${bookId}`
        );
        if (response.status === 200) {
          handleSnack(
            'success',
            `Livro ${type === 'return' ? 'devolvido' : 'pego'} com sucesso!`
          );
          if (callback) {
            const data = {
              ...response.data,
            };
            if (type === 'return') {
              data.idUser = null;
            }
            callback(data);
          }
        }
      } else if (data === '' || data === null) {
        return;
      } else {
        handleSnack('error', 'QRCode inválido');
        setOpen(true);
      }
    } catch (err) {
      console.log('lending error: ', err);
      handleSnack('error', 'Ocorreu um erro durante a requisição');
    }
  };

  const handleStatus = () => {
    const isReserve = type !== 'return';

    if (isReserve) {
      const haveDelay = moment().isAfter(moment(lending.reservationEndAt));
      if (haveDelay) {
        return (
          <Alert severity="error">
            A reserva deste livro se encontra em atraso - Entrega prevista para{' '}
            {moment(moment(lending.reservationEndAt)).format('DD/MM/YYYY')}
          </Alert>
        );
      } else {
        return (
          <Alert severity="info">
            Você tem até {moment(lending.reservationEndAt).format('DD/MM/YYYY')}{' '}
            para pegar esse livro
          </Alert>
        );
      }
    } else {
      const haveDelay = moment().isAfter(moment(lending.lendingEndAt));
      if (haveDelay) {
        return (
          <Alert severity="error">
            A entrega deste livro se encontra em atraso - Previsto para{' '}
            {moment(lending.lendingEndAt).format('DD/MM/YYYY')}
          </Alert>
        );
      } else {
        return (
          <Alert severity="info">
            Você tem até {moment(lending.lendingEndAt).format('DD/MM/YYYY')}{' '}
            para devolver este livro
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
            // onClick={() => handleScan('https://appmasters.io')}
          >
            {type === 'return' ? 'Devolver livro' : 'Pegar livro'}
          </Button>
        </Grid>
        <Grid item>{handleStatus()}</Grid>
      </Grid>
      <ConfirmLending
        open={open}
        return={type === 'return'}
        onClose={() => setOpen(false)}
        handleError={(data) => console.log('handleError', data)}
        handleScan={handleScan}
      />
    </>
  );
};

export default LendingModal;
