import React, { useState, useEffect } from 'react';
import { Grid, Button, Typography } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { book } from '../assets/css/makeStyles';
import { useParams } from 'react-router-dom';
import DetailedBookCard from '../components/DetailedBookCard';
import LoadingSpinner from '../components/LoadingSpinner';
import api from '../services/api';
import { useHistory } from 'react-router-dom';

export const Book = (props) => {
  const classes = book();
  const { id } = useParams();
  const [error, setError] = useState(null);
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  useEffect(() => {
    setLoading(true);
    const getData = async () => {
      try {
        const response = await api.get(`/books/${id}`);
        if (response.status === 200) {
          setDetails(response.data);
        }
        setLoading(false);
      } catch (err) {
        setLoading(false);
        setError(true);
        console.log('Not able to get book', err);
      }
    };
    getData();
  }, [id]);

  return (
    <div className={classes.root}>
      <Grid container className={classes.container} spacing={3}>
        <Button
          size="large"
          color="primary"
          onClick={() => history.goBack()}
          className={classes.button}
          startIcon={<ArrowBackIosIcon />}
        >
          Voltar
        </Button>
        <Grid item xs={12} lg={12} md={12}>
          {error ? (
            <Typography variant={'h5'} style={{ textAlign: 'center' }}>
              Livro não encontrado
            </Typography>
          ) : !details || loading ? (
            <LoadingSpinner />
          ) : (
            <DetailedBookCard book={details} />
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default Book;
