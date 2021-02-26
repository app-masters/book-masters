import React, { useState } from 'react';
import { Button, Typography } from '@material-ui/core';
import { useAuth } from '../lib/auth';
import Modal from '@material-ui/core/Modal';
import FormLogin from '../components/FormLogin';
import { modalLogin } from '../assets/css/makeStyles';

const LendingModal = () => {
  const { auth } = useAuth();
  const [open, setOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const classes = modalLogin();

  const handleClose = () => setOpen(false);

  const handleAction = () => {
    // User not logged them display login
    if (!auth) {
      setModalContent(<FormLogin callback={() => setOpen(false)} />);
      setOpen(true);
    } else {
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

export default LendingModal;
