import React, { useState } from 'react';
import { detailedBookCard } from '../assets/css/makeStyles';
import { Paper, Box, Grid, Chip, Typography } from '@material-ui/core';
import ReserveModal from './ReserveModal';
import LendingModal from './LendingModal';
import ReturnModal from './LendingModal';
import AvailabilityModal from './AvailabilityModal';
import { useAuth } from '../lib/auth';
import bookImage from '../assets/img/book.png';
import AlertSnackBar from './AlertSnackbar';

const DetailedBookCard = (props) => {
  const { auth } = useAuth();
  const classes = detailedBookCard();
  const [book, setBook] = useState(props.book);

  const [request, setRequest] = useState({ type: '', message: '' });
  const [snackOpen, setSnackOpen] = useState(false);
  const handleSnack = (type, message) => {
    setRequest({
      type,
      message,
    });
    setSnackOpen(true);
  };
  const closeSnack = () => {
    setSnackOpen(false);
    setRequest({ type: '', message: '' });
  };

  const handleStatus = () => {
    const lending = book?.lending;
    if (lending && lending.idUser && lending.idUser === auth?.user?._id) {
      if (lending.status === 'Reservado')
        return (
          <LendingModal
            bookId={book._id}
            lending={lending}
            handleSnack={handleSnack}
            callback={() =>
              setBook({
                ...book,
                lending: { ...book.lending, status: 'Emprestado' },
              })
            }
          />
        );
      if (lending.status === 'Emprestado')
        return (
          <ReturnModal
            bookId={book._id}
            lending={lending}
            type="return"
            handleSnack={handleSnack}
            callback={(newStatus) =>
              setBook({
                ...book,
                lending: { ...book.lending, ...newStatus },
              })
            }
          />
        );
    } else if (lending?.status === 'Reservado') {
      return <AvailabilityModal bookId={book._id} lending={lending} />;
    } else {
      return (
        <ReserveModal
          bookId={book._id}
          handleSnack={handleSnack}
          callback={(newStatus) =>
            setBook({
              ...book,
              lending: {
                ...newStatus,
              },
            })
          }
        />
      );
    }
  };

  return (
    <>
      <Paper className={classes.root}>
        <Grid
          container
          justify="flex-start"
          style={{ flex: 1 }}
          spacing={3}
          alignItems="flex-start"
        >
          <Grid item xs={12} sm={4}>
            <img
              src={
                book.imageUrl ? book.imageUrl : book.img ? book.img : bookImage
              }
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
              <Typography variant="h6">Autor: {book.author}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">
                Editora: {book.publishingCompany}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">
                Ano de publicação: {book.publicationYear}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">Edição: {book.edition}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">Descrição:</Typography>
            </Grid>
            <Grid item xs={12} className={classes.details}>
              <Box component="div" overflow="auto">
                {book.description}
              </Box>
            </Grid>
            <Grid item xs={12}>
              {book.tag.map((t) => (
                <Chip key={t} label={t} style={{ marginTop: '20px' }} />
              ))}
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
          style={{ paddingTop: 16 }}
          container
          justify="flex-end"
          alignContent="flex-end"
        >
          {handleStatus()}
        </Grid>
      </Paper>
      <AlertSnackBar
        open={snackOpen}
        onClose={closeSnack}
        severity={request.type}
        message={request.message}
      />
    </>
  );
};

export default DetailedBookCard;
