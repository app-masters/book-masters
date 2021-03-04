import React, { useState } from 'react';
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
  const [displayQrCode, setDisplay] = useState(false);
  const classes = confirmLending();

  const onClose = () => {
    setDisplay(false);
    props.onClose();
  };

  return (
    <Dialog open={props.open} onClose={onClose}>
      <DialogTitle id="form-dialog-title">
        {props.return ? 'Devolver livro' : 'Pegar livro'}
      </DialogTitle>
      <DialogContent className={classes.content}>
        {!displayQrCode ? (
          <DialogContentText>
            Siga os passos abaixo para {props.return ? 'devolver' : 'pegar'} o
            livro.
            <ul>
              <li>
                Vá até a appmasters
                <br />
                <small>
                  <strong>
                    Av Barão do Rio Branco 3480 Quinto andar - Altos Passos,
                    Juiz de Fora - MG, 36020-025
                  </strong>
                </small>
              </li>
              <li>
                Escaneie o QRcode disponibilizado na appmasters para confirmar a
                sua localização
              </li>
              <li>
                {props.return ? 'Devolva o livro para' : 'Pegue o livro com'}{' '}
                um dos nossos colaboradores
              </li>
            </ul>
          </DialogContentText>
        ) : (
          <>
            <DialogContentText>
              Escaneie o QRcode disponibilizado na appmasters para confirmar a
              sua localização
            </DialogContentText>
            <QrReader
              className={classes.qrCode}
              delay={300}
              onError={props.handleError}
              onScan={(data) => {
                setDisplay(false);
                props.handleScan(data);
              }}
            />
          </>
        )}
      </DialogContent>
      <DialogActions>
        {!displayQrCode && (
          <Button
            color="primary"
            variant="contained"
            onClick={() => setDisplay(true)}
          >
            Escanear QRcode
          </Button>
        )}
        <Button color="primary" onClick={onClose}>
          Cancelar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmLending;
