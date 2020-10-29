import React, { useState } from "react";
import Container from "@material-ui/core/Container";
import BookCard from "./components/BookCard";
import { booksContainer } from './assets/css/makeStyles'
import LoadingSpinner from './components/LoadingSpinner'

const Books = (props) => {

  const {books} = props;
  const classes = booksContainer();

  if(props.loading){
    return <LoadingSpinner/>
  }

  let booksCards = books.map((book) => {
    return (
      <BookCard book={book} />
    )
  });


  return (
    <Container 
      maxWidth="lg"
      className={classes.container}
    >
        {booksCards}
    </Container>
  );
 
}
export default Books;
