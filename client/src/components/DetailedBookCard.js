import React, { useState } from 'react';
import { detailedBookCard } from '../assets/css/makeStyles';
import { Paper, Box, Grid, Chip, Button, Typography } from '@material-ui/core';
import ReserveModal from './ReserveModal';
import LendingModal from './LendingModal';
import ReturnModal from './LendingModal';
import { useAuth } from '../lib/auth';
import bookImage from '../assets/img/book.png';
import moment from 'moment';
import Alert from '@material-ui/lab/Alert';

const DetailedBookCard = (props) => {
  const { auth } = useAuth();
  const classes = detailedBookCard();
  const [book, setBook] = useState(props.book);

  const handleStatus = () => {
    const lending = book?.lending;
    if (lending && lending.idUser && lending.idUser === auth?.user?._id) {
      if (lending.status === 'Reservado')
        return (
          <LendingModal
            bookId={book._id}
            lending={lending}
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
            callback={() =>
              setBook({
                ...book,
                lending: { ...book.lending, status: 'Devolvido' },
              })
            }
          />
        );
    } else if (lending?.status === 'Reservado') {
      const date = moment(lending.lendingEndAt || lending.reservationEndAt);
      return (
        <Grid container direction="column" alignItems="flex-end" spacing={2}>
          <Grid item>
            <Button size="large" variant="contained" color="primary">
              Avise me quando chegar
            </Button>
          </Grid>
          <Grid item>
            {moment().isAfter(date) ? (
              <Alert severity="error">A reserva deste livro se encontra em atraso - Previsto para {moment(date).format('DD/MM/YYYY')}</Alert>
            ) : (
              <Alert severity="info">
                Previsão de retorno para {moment(date).format('DD/MM/YYYY')}
              </Alert>
            )}
          </Grid>
        </Grid>
      );
    } else {
      return (
        <ReserveModal
          bookId={book._id}
          callback={() =>
            setBook({
              ...book,
              lending: {
                status: 'Reservado',
                idUser: auth?.user?._id,
              },
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
