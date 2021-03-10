import React from 'react';
import bookImage from '../assets/img/book.png';
import { bookCard } from '../assets/css/makeStyles';
import {
  Typography,
  CardMedia,
  CardContent,
  Card,
  Chip,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';

const BookCard = ({ book }) => {
  const classes = bookCard();
  const router = useHistory();
  return (
    <Card className={classes.root} variant="outlined">
      <CardMedia
        onClick={() => router.push(`/book/${book._id}`)}
        component="img"
        className={classes.cover}
        style={{ height: 260, cursor: 'pointer' }}
        image={book.imageUrl ? book.imageUrl : book.img ? book.img : bookImage}
        title="Image title"
      />
      <CardContent className={classes.content}>
        <a href={`/book/${book._id}`} style={{ textDecoration: 'none' }}>
          <Typography variant="h5" component="h2" className={classes.title}>
            {book.title}
          </Typography>
        </a>
        <div className={classes.tags}>
          {book.tags.map((t) => (
            <Chip size="small" key={t} label={t} style={{ marginRight: 8, marginBottom: 4 }} />
          ))}
        </div>
        {book.description && (
          <Typography variant="body2">
            {book.description.length > 100
              ? book.description.substr(0, 100) + '...'
              : book.description}
          </Typography>
        )}
        <div className={classes.footer}>
          <a href={`/book/${book._id}`}>
            <button style={{ cursor: 'pointer' }} className={classes.button}>
              Ver detalhes
            </button>
          </a>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookCard;
