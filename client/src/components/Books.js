import React from 'react';
import Container from '@material-ui/core/Container';
import BookCard from './BookCard';
import { booksContainer } from '../assets/css/makeStyles';
import LoadingSpinner from './LoadingSpinner';

const Books = (props) => {
  const { books } = props;
  const classes = booksContainer();

  if (props.loading) {
    return <LoadingSpinner showLoadingText />;
  }

  let booksCards = books.map((book) => {
    return <BookCard key={book._id} book={book} />;
  });

  return (
    <Container maxWidth="lg" className={classes.container}>
      {booksCards}
    </Container>
  );
};
export default Books;
