import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import BookCard from "./components/BookCard";
import { booksContainer } from './assets/css/makeStyles'

const Books = (props) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const {books} = props;
  const classes = booksContainer();

  // if(errorMessage != ''){
  //   return <h3>{errorMessage}</h3>
  // }
  // if(!isLoaded){
  //   //console.log(this.state.isLoaded)
  //   return <LoadingSpinner/>
  // }

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
