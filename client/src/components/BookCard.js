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
  Chip,
} from '@material-ui/core';

const BookCard = ({ book }) => {
  const classes = bookCard();
  return (
    <Card className={classes.root} variant="outlined">
      <CardMedia
        component="img"
        className={classes.cover}
        style={{ height: 250, borderRadius: 4 }}
        image={book.imageUrl ? book.imageUrl : book.img ? book.img : bookImage}
        title="Image title"
      />
      <CardContent className={classes.content}>
        <Typography variant="h5" component="h2" className={classes.title}>
          {book.title}
        </Typography>
        <div className={classes.tags}>
          {book.tags.map((t) => (
            <Chip size="small" key={t} label={t} style={{ marginRight: 8 }} />
          ))}
        </div>
        {book.description && (
          <Typography variant="body2">
            {book.description.length > 100
              ? book.description.substr(0, 100) + '...'
              : book.description}
          </Typography>
        )}
        <a href={`/book/${book._id}`}>
          <button style={{ cursor: 'pointer' }} className={classes.button}>
            Ver detalhes
          </button>
        </a>
      </CardContent>
    </Card>
  );
};

export default BookCard;
