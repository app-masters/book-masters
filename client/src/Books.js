import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";

import api from "./services/api";
import LoadingSpinner from "./components/LoadingSpinner";
import BookCard from "./components/BookCard";

class Books extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: '',
      isLoaded: false,
      livros: [],
    };
  }



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
        errorMessage: '',
        isLoaded: true,
        livros: sortedBooks
      });

    } catch (error) {

      this.setState({
        errorMessage: error.message,
        isLoaded: false,
        livros: []
      });

      console.log(error);
    }
      
  }



  render() {
    if(this.state.errorMessage != ''){
      return <h3>{this.state.errorMessage}</h3>
    }
    if(!this.state.isLoaded){
      //console.log(this.state.isLoaded)
      return <LoadingSpinner/>
    }

    let booksCards = this.state.livros.map((book) => {
      //console.log("teste", book);
      return (
        <Grid item xs={12} sm={6} md={4} >
            <BookCard book={book} />
        </Grid>
      )
      
    });


    return (
      <div className="root">
        <Container maxWidth="md">
          <Grid
            container
            spacing={2}
            style={{ marginTop: "24px", marginBottom: "24px", minHeight:"80vh" }}
          >
            {booksCards}
          </Grid>
        </Container>
      </div>
    );
  }
}
export default Books;
