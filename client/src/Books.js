import React, { Component, useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";

import api from "./services/api";
import LoadingSpinner from "./components/LoadingSpinner";
import BookCard from "./components/BookCard";

const Books = (props) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const books = props.books;
  console.log(props);


  


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
