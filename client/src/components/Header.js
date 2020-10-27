import React from "react";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";

import {header} from '../assets/css/makeStyles'


export default function Header() {
  const classes = header();

  return (
      <main>
        <Box className={classes.heroContent}>
          <Container fluid>
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
        </Box>
      </main>
  );
}