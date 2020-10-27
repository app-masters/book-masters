import React, { Component, useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";

import api from "./services/api";
import LoadingSpinner from "./components/LoadingSpinner";
import BookCard from "./components/BookCard";

const Books = (props) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [books, setBooks] = useState([]);


  const fetchBooks = async () => {
    return await api.get('/books/');

  }

  useEffect(async () => {
    try {
      const response = await fetchBooks();
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

      setErrorMessage('');
      setIsLoaded(true);
      setBooks(sortedBooks);
      

    } catch (error) {

      setErrorMessage(error.message);
      setIsLoaded(false);
      setBooks([]);

      console.log(error);
  }
}, []) 



  if(errorMessage != ''){
    return <h3>{errorMessage}</h3>
  }
  if(!isLoaded){
    //console.log(this.state.isLoaded)
    return <LoadingSpinner/>
  }

  let booksCards = books.map((book) => {
    //console.log("teste", book);
    return (
      <Grid item xs={12} sm={6} >
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
export default Books;
