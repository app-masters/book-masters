import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { Button } from "@material-ui/core";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function FormModal() {
  id = 0;

  handleSubmit = (event) => {
    event.preventDefault();
    const nome = event.target.elements.nome.value;
    const usuario = JSON.stringify({ nome: nome, status: true });
    localStorage.setItem(`@bookStatus${this.id}`, usuario);
    window.location.reload();
  };

  handleLogout = () => {
    localStorage.removeItem(`@bookStatus${this.id}`);
    window.location.reload();
  };
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const { details } = this.props.location.state;
  this.id = details.id;
  var user = JSON.parse(localStorage.getItem(`@bookStatus${details.id}`));
  console.log(details);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <form onSubmit={this.handleSubmit}>
        <p>Deseja alugar esse livro?</p>
        <p>Insira seu nome:</p>
        <input type="text" name="nome" placeholder="Nome de usuário" required />
        <button type="submit">Pegar</button>
      </form>
      <h2 id="simple-modal-title">Text in a modal</h2>
      <p id="simple-modal-description">
        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
      </p>
      <FormModal />
    </div>
  );

  return (
    <div>
      <Button onClick={handleOpen} variant="outlined">
        Alugarr
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}
