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
import { statusBook } from '../utils/constraints';

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

  console.log(book);
  const handleStatus = () => {
    const lending = book?.lending;
    if (lending && lending.idUser && lending.idUser === auth?.user?._id) {
      if (lending.status === statusBook.reserved)
        return (
          <LendingModal
            bookId={book._id}
            lending={lending}
            handleSnack={handleSnack}
            callback={(data) => 
              setBook({
                ...book,
                lending: { ...data },
              })
            }
          />
        );
      if (lending.status === statusBook.borrowed)
        return (
          <ReturnModal
            bookId={book._id}
            lending={lending}
            type="return"
            handleSnack={handleSnack}
            callback={(data) =>
              setBook({
                ...book,
                lending: { ...data },
              })
            }
          />
        );
    } else if (
      lending?.status === statusBook.reserved ||
      lending?.status === statusBook.borrowed
    ) {
      return (
        <AvailabilityModal
          bookId={book._id}
          lending={lending}
          watching={book.watching}
          callback={() => setBook({ ...book, watching: true })}
        />
      );
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
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="body2">ISBN {book.isbn}</Typography>
                <Typography variant="h4">{book.title}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="h6">
                  Autor
                  <Typography variant="body2">{book.author}</Typography>
                </Typography>
              </Grid>
              {!!book.publishingCompany && (
                <Grid item xs={12} sm={6}>
                  <Typography variant="h6">
                    Editora
                    <Typography variant="body2">
                      {book.publishingCompany}
                    </Typography>
                  </Typography>
                </Grid>
              )}
              {!!book.publicationYear && (
                <Grid item xs={12} sm={6}>
                  <Typography variant="h6">
                    Ano de publicação
                    <Typography variant="body2">
                      {book.publicationYear}
                    </Typography>
                  </Typography>
                </Grid>
              )}
              {!!book.edition && (
                <Grid item xs={12} sm={6}>
                  <Typography variant="h6">
                    Edição
                    <Typography variant="body2">{book.edition}</Typography>
                  </Typography>
                </Grid>
              )}
              <Grid item xs={12}>
                <Typography variant="h6">Descrição</Typography>
                <Box component="div" overflow="auto">
                  <Typography variant="body2">{book.description}</Typography>
                </Box>
              </Grid>
              <Grid item xs={12}>
                {book.tags.map((t) => (
                  <Chip key={t} label={t} style={{ marginRight: 8 }} />
                ))}
              </Grid>
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
