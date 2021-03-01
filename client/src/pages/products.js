import React, { useState, useEffect } from 'react';
import { Grid, Button } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { product } from '../assets/css/makeStyles';
import { Link as RouterLink } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import DetailedBookCard from '../components/DetailedBookCard';
import api from '../services/api';
import Skeleton from '@material-ui/lab/Skeleton';

export const Product = (props) => {
  const classes = product();
  const { id } = useParams();
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(false);

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
        console.log('Not able to get book', err);
        setLoading(false);
      }
    };
    getData();
  }, [id]);

  return (
    <Grid
      container
      className={classes.container}
      spacing={3}
      style={{ width: 'auto' }}
    >
      <Button
        component={RouterLink}
        to="/"
        size="large"
        color="primary"
        className={classes.button}
        startIcon={<ArrowBackIosIcon />}
      >
        Voltar
      </Button>
      <Grid item xs={12} lg={12} md={12}>
        {!details || loading ? (
          <Skeleton animation="wave" />
        ) : (
          <DetailedBookCard book={details} />
        )}
      </Grid>
    </Grid>
  );
};

export default Product;
