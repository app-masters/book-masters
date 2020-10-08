import React, { Component } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import BookCard from "./Components/BooksCards";
import revolucaoDosBichosImg from "./assets/img/revolucaoDosBichos.png";
import divinaComediaImg from "./assets/img/divinaComedia.png";
import homoDeusImg from "./assets/img/homoDeus.png";
import sapiensImg from "./assets/img/sapiens.png";
import milNoventaOitentaQuatroImg from "./assets/img/milNoventaOitentaQuatro.png";
import eraDasRevolucoesImg from "./assets/img/eraDasRevolucoes.png";
import BookCardAlugado from "./Components/BookCardAlugado";
import BookCardDisponivel from "./Components/BookCardDisponivel";
import api from "./services/api";

class Books extends Component {
  render() {
    let booksCards = Books.state.livros.map((book) => {
      console.log("teste", book);
      return book.status ? (
        <Grid item xs={12} sm={6} md={4}>
          <BookCardAlugado book={book} />
        </Grid>
      ) : (
        <Grid item xs={12} sm={6} md={4}>
          <BookCardDisponivel book={book} />
        </Grid>
      );
    });
    return (
      <React.Fragment>
        <CssBaseline />
        <Container maxWidth="md">
          <Grid
            container
            spacing={2}
            style={{ marginTop: "24px", marginBottom: "24px" }}
          >
            {booksCards}
          </Grid>
        </Container>
      </React.Fragment>
    );
  }
}
export default Books;
