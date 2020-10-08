import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import styled from "styled-components";
import Box from "@material-ui/core/Box";
import { Link } from "react-router-dom";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { TextField } from "@material-ui/core";
import moment from "moment";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

export const Styles = styled.div`
  .MuiContainer-root {
    margin-top: 50px;
  }
  .MuiPaper-root {
    width: 420px;
    margin: auto;
    margin-bottom: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .MuiCardMedia-media {
    width: 240px;
  }
  .MuiTypography-body1 {
    text-align: center;
  }
  .MuiButtonBase-root {
    margin-top: 50px;
  }
  .MuiTypography-h5 {
    font-size: 1.5rem;
    font-family: "Roboto", "Helvetica", "Arial", sans-serif;
    font-weight: 500;
    line-height: 1.334;
    letter-spacing: 0em;
    text-align: center;
  }
  .MuiPaper-elevation1 {
    box-shadow: inset 0px -3px 0px 0px rgba(10, 182, 255),
      0px 0px 0px 0px rgba(0, 0, 0, 0.14), 0px 0px 3px 0px rgba(0, 0, 0, 0.12);
  }
  .MuiCardContent-root {
    padding: 14px 8px 8px 8px;
    height: auto;
  }
  .MuiButton-outlined {
    border: 1px solid #0ab6ff;
    color: #0ab6ff;
    padding: 5px 15px;
    margin: 50px 5px 20px 5px;

    &:hover {
      background-color: #0ab6ff;
      color: #fff;
      .MuiButton-label a {
        color: #fff;
      }
    }
    .MuiButton-label a {
      text-decoration: none;
      color: #0ab6ff;
    }
  }
  .descriptionTitle {
    font-size: 18px;
    margin: 10px 0;
    font-weight: 500;
    font-family: Roboto, sans-serif;
    color: #343a40;
  }
  .description {
    font-weight: 300;
    font-style: normal;
    font-size: 15px;
    color: #6c757d;
  }
  .btn-form {
    border: 1px solid #0ab6ff;
    color: #0ab6ff;
    padding: 11px 15px;
    margin: 0px 5px 10px 5px;
  }

  .MuiOutlinedInput-input {
    /* imput */
    padding: 15px 14px;
  }
`;

export default class Product extends Component {
  id = 0;

  date = moment().format("DD[/]MM [às] h:mm");

  handleSubmit = (event) => {
    event.preventDefault();
    const nome = event.target.elements.nome.value;
    const usuario = JSON.stringify({
      nome: nome,
      status: true,
      dates: this.date,
      id: this.props.id,
    });
    localStorage.setItem(`@bookStatus/Book ID: ${this.id}`, usuario);
    window.location.reload();
  };

  handleLogout = () => {
    localStorage.removeItem(`@bookStatus/Book ID: ${this.id}`);
    window.location.reload();
  };

  render() {
    moment.locale("pt-BR");
    function myFunction() {
      var x = document.getElementById("myDIV");
      if (x.style.display !== "none") {
        x.style.display = "none";
      } else {
        x.style.display = "block";
      }
    }
    const { details } = this.props.location.state;
    this.id = details.id;
    var user = JSON.parse(
      localStorage.getItem(`@bookStatus/Book ID: ${details.id}`)
    );

    if (user !== null) {
      return (
        <Styles>
          <Container className="cardGrid">
            <Button>
              <Link to="/">
                <ArrowBackIosIcon />
              </Link>
            </Button>
            <Card className="card">
              <CardMedia
                style={{ paddingTop: "10px" }}
                component="img"
                className="cardMedia"
                image={details.img}
                title="Image title"
              />
              <CardContent className="cardContent">
                <Typography gutterBottom variant="h5" component="h2">
                  {details.name}
                </Typography>
                <Typography>{details.autor}</Typography>
                <Typography className="descriptionTitle" variant="h2">
                  Descrição
                </Typography>
                <Typography className="description">
                  {details.description}
                </Typography>
              </CardContent>
              <Box display="flex" justifyContent="center">
                <Typography className="descriptionTitle" variant="h2">
                  Livro Alugado. Deseja devolvevr?
                </Typography>
                <Button
                  className="btn-devolver"
                  onClick={this.handleLogout}
                  variant="outlined"
                >
                  Devolver
                </Button>
              </Box>
            </Card>
          </Container>
          <Container className="cardGrid">
            <Card className="card">
              <Typography variant="h5">Livro alugado por:</Typography>
              <CardContent className="cardContent">
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Nome:</TableCell>
                      <TableCell>Data: </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>{user.nome}</TableCell>
                      <TableCell>{user.dates}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </Container>
        </Styles>
      );
    }
    return (
      <Styles>
        <Container className="cardGrid">
          <Button>
            <Link to="/">
              <ArrowBackIosIcon />
            </Link>
          </Button>
          <Card className="card">
            <CardMedia
              style={{ paddingTop: "10px" }}
              component="img"
              className="cardMedia"
              image={details.img}
              title="Image title"
            />
            <CardContent className="cardContent">
              <Typography gutterBottom variant="h5" component="h2">
                {details.name}
              </Typography>
              <Typography>{details.autor}</Typography>
              <Typography className="descriptionTitle" variant="h2">
                Descrição
              </Typography>
              <Typography className="description">
                {details.description}
              </Typography>
            </CardContent>
            <Box display="flex" justifyContent="center">
              <Button onClick={myFunction} variant="outlined">
                Alugar
              </Button>
            </Box>
            <form
              id="myDIV"
              style={{ display: "none" }}
              onSubmit={this.handleSubmit}
            >
              <Typography>Deseja alugar esse livro?</Typography>
              <Typography>Insira seu nome:</Typography>
              <TextField
                id="standard-secondary"
                label="Seu nome"
                variant="outlined"
                type="text"
                name="nome"
                required
              />
              <Button className="btn-form" type="submit" variant="outlined">
                Pegar
              </Button>
            </form>
          </Card>
        </Container>
      </Styles>
    );
  }
}
