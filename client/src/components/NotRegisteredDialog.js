import React from 'react';
import Button from '@material-ui/core/Button';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Link,
} from '@material-ui/core';

const NotRegisteredDialog = (props) => {
  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <DialogTitle id="form-dialog-title">
        Você ainda não está cadastrado.{' '}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Para reservar um livro você precisa ter uma conta cadastrada em nossa
          plataforma. Clique no link abaixo para conhecer a plataforma e criar
          sua conta.
        </DialogContentText>
        <DialogContentText>
          <Link
            href="https://programador.emjuizdefora.com/"
            target="_blank"
            rel="noreferrer"
            variant="body2"
          >
            https://programador.emjuizdefora.com/
          </Link>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={props.onClose}>
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NotRegisteredDialog;
