import React, { useState } from 'react';
import { Grid, Button } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { product } from '../assets/css/makeStyles';
import { Link as RouterLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import DetailedBookCard from '../components/DetailedBookCard';

export const Product = (props) => {
  const classes = product();
  const location = useLocation();
  const [details] = useState(location.state);

  console.log(details);

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
        <DetailedBookCard book={details} />
      </Grid>
    </Grid>
  );
};

export default Product;
