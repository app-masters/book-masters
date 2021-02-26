import React, { useState } from 'react';
import { detailedBookCard } from '../assets/css/makeStyles';
import { Paper, Box, Grid, Chip, Typography } from '@material-ui/core';
import ReserveModal from './ReserveModal';
import LendingModal from './LendingModal';
import ReturnModal from './ReturnModal';
import { useAuth } from '../lib/auth';
import bookImage from '../assets/img/book.png';

const DetailedBookCard = (props) => {
  const { auth } = useAuth();
  const classes = detailedBookCard();
  const [book, setBook] = useState(props.book);

  const handleStatus = () => {
    if (book.idUserReserve && book.idUserReserve === auth?.user?._id) {
      if (book.status === 'Reservado')
        return <LendingModal bookId={book._id} />;
      if (book.status === 'Emprestado')
        return <ReturnModal bookId={book._id} />;
    } else if (book.status === 'Reservado') {
      return <div>avise quando disponível</div>;
    } else {
      return (
        <ReserveModal
          bookId={book._id}
          callback={() =>
            setBook({
              ...book,
              status: 'Reservado',
              idUserReserve: auth?.user?._id,
            })
          }
        />
      );
    }
  };

  return (
    <Paper className={classes.root}>
      <Grid container justify="flex-start" alignItems="flex-start">
        <Grid item xs={12} sm={4}>
          <img
            src={book.img || bookImage}
            alt="BookCover"
            className={classes.cover}
          />
        </Grid>
        <Grid item xs={12} sm={8}>
          <Grid item xs={12}>
            <Typography>ISBN: {book.isbn}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography component="h3" variant="h4">
              {book.title}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5">{book.author}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">
              Editora {book.publishingCompany}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>Ano de publicação: {book.publicationYear}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>Edição: {book.edition}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">Descrição</Typography>
          </Grid>
          <Grid item xs={12} className={classes.details}>
            <Box
              component="div"
              overflow="auto"
              style={{ maxHeight: '200px', maxWidth: '95%' }}
            >
              {book.description}
            </Box>
          </Grid>
          <Grid item xs={12}>
            {book.tag.map((t) => (
              <Chip key={t} label={t} style={{ marginTop: '20px' }} />
            ))}
          </Grid>
          <Grid
            item
            xs={12}
            container
            justify="flex-end"
            alignContent="flex-end"
          >
            {handleStatus()}
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default DetailedBookCard;
