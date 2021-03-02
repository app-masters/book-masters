import React from 'react';
import { Box, Container, Typography } from '@material-ui/core';

import { header } from '../assets/css/makeStyles';

const Header = ({ extra }) => {
  const classes = header();
  return (
    <main>
      <Box className={classes.heroContent}>
        <Container className={classes.header}>
          <Typography
            className={classes.heroText}
            component="h1"
            variant="h2"
            align="center"
            color="textPrimary"
            gutterBottom
          >
            Book Masters
          </Typography>
          <Typography
            className={classes.heroText}
            variant="h5"
            align="center"
            color="textSecondary"
            paragraph
          >
            Bem vindo a biblioteca virtual da App Masters
          </Typography>
        </Container>
        {extra}
      </Box>
    </main>
  );
};

export default Header;
