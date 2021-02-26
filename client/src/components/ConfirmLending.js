import React from 'react';
import Button from '@material-ui/core/Button';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';
import QrReader from 'react-qr-reader';
import { confirmLending } from '../assets/css/makeStyles';

const ConfirmLending = (props) => {
  const classes = confirmLending();
  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <DialogTitle id="form-dialog-title">Ler QRCode</DialogTitle>
      <DialogContent className={classes.content}>
        <DialogContentText>
          Obrigado por utilizar nossa plataforma. Leia o QRCode para confirmar a
          ação
        </DialogContentText>
        <QrReader
          className={classes.qrCode}
          delay={300}
          onError={props.handleError}
          onScan={props.handleScan}
        />
      </DialogContent>
      <DialogActions>
        <Button color="secondary" onClick={props.onClose}>
          Cancelar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmLending;
