import React, { useState } from 'react';
import { Button, Typography } from '@material-ui/core';
import Modal from '@material-ui/core/Modal';
import { modal } from '../assets/css/makeStyles';

const ReturnModal = (props) => {
  const [open, setOpen] = useState(false);

  const classes = modal();

  const handleClose = () => setOpen(false);

  const handleAction = () => {
    setOpen(true)
  };

  return (
    <>
      <Button
        size="large"
        variant="contained"
        color="primary"
        onClick={handleAction}
      >
        Retornar livro
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
        </div>
      </Modal>
    </>
  );
};

export default ReturnModal;
