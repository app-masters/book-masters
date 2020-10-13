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
import Loading from "react-loading";
import LoadingSpinner from "./Components/LoadingSpinner";

class Books extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      livros: [],
    };
  }

/*
  constructor(props) {
    super(props);
    this.state = {
      livros: [],
    };
  }

 

  componentDidMount() {
    this.fetchBooks().then(response => {
      this.setState({
        livros: response
      });
    });

    const books = this.fetchBooks();
    console.log(books)
  }
*/
  async fetchBooks() {
    return await api.get('/books/');

  }


  async componentDidMount() {
    try {
      const response = await this.fetchBooks();
      //console.log(response)
      if (response.status !== 200) {
        throw Error(response.statusText);
      }

      const json = await response.data;
      
      const sortedBooks = json.sort((bookA, bookB) => {
        if(bookA.status === bookB.status){
          if(bookA.title < bookB.title ){return -1;}
          if(bookA.title > bookB.title ){return 1;}
          return 0;
        } else {
          return bookA.status === bookB.status ? 0 : bookA.status? 1 : -1;
        }
      });

      this.setState({
        isLoaded: true,
        livros: sortedBooks
      });

    } catch (error) {
      console.log(error);
    }
      
  }



  render() {

    if(!this.state.isLoaded){
      //console.log(this.state.isLoaded)
      return <LoadingSpinner/>
    }

    let booksCards = this.state.livros.map((book) => {
      //console.log("teste", book);
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
