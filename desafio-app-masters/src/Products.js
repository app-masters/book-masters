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
    margin: 5px 5px 12px 5px;

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
`;

export default class Product extends Component {
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

  render() {
    const { details } = this.props.location.state;
    this.id = details.id;
    var user = JSON.parse(localStorage.getItem(`@bookStatus${details.id}`));
    console.log(details);

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
                <Button onClick={this.handleSubmit} variant="outlined">
                  Alugar
                </Button>
                <Button onClick={this.handleLogout} variant="outlined">
                  Devolver
                </Button>
              </Box>
            </Card>
            <Typography className="descriptionTitle" variant="h2">
              Livro Alugado. Deseja devolvevr?
            </Typography>
            <Button onClick={this.handleLogout} variant="outlined">
              Devolver
            </Button>
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
              <Button onClick={this.handleSubmit} variant="outlined">
                Alugar
              </Button>
            </Box>
          </Card>
        </Container>
        <form onSubmit={this.handleSubmit}>
          <p>Deseja alugar esse livro?</p>
          <p>Insira seu nome:</p>
          <input
            type="text"
            name="nome"
            placeholder="Nome de usuário"
            required
          />
          <button type="submit">Pegar</button>
        </form>
      </Styles>
    );
  }
}
