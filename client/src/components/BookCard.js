import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import bookImage from '../assets/img/book.png';
import { bookCard } from '../assets/css/makeStyles';
import DoneIcon from '@material-ui/icons/Done';
import PauseIcon from '@material-ui/icons/Pause';
import {
  Avatar,
  CardHeader,
  Typography,
  CardMedia,
  CardContent,
  Card,
  CardActionArea,
} from '@material-ui/core';

const BookCard = ({ book }) => {
  const classes = bookCard();

  let status = () => {
    const lending = book?.lending;
    if (lending?.status === 'Reservado' || lending?.status === 'Emprestado') {
      return (
        <CardContent className={classes.bookStatus}>
          <Avatar variant="rounded" className={classes.yellow}>
            <PauseIcon />
          </Avatar>
          <Typography className={classes.status} variant="h6">
            Livro reservado
          </Typography>
        </CardContent>
      );
    } else {
      return (
        <CardContent className={classes.bookStatus}>
          <Avatar variant="rounded" className={classes.green}>
            <DoneIcon />
          </Avatar>
          <Typography className={classes.status} variant="h6">
            Livro disponível
          </Typography>
        </CardContent>
      );
    }
  };

  return (
    <Card className={classes.root} variant="outlined">
      <CardActionArea
        className={classes.rootAction}
        component={RouterLink}
        to={{
          pathname: `/book/${book._id}`,
          state: book,
        }}
      >
        <CardMedia
          component="img"
          className={classes.cover}
          image={book.imageUrl ? book.imageUrl : book.img ? book.img : bookImage}
          title="Image title"
        />
        <CardHeader
          title={book.title}
          subheader={book.autor}
          className={classes.header}
        />
        {status()}
      </CardActionArea>
    </Card>
  );
};

export default BookCard;
