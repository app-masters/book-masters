import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Books from "./Books";

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    paddingTop: 40,
    height: "50vh",
  },
  heroText: {
    fontFamily: "Poppins, sans-serif",
    color: "#ffffff",
  },
}));

export default function Home() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <main>
        <Box
          className={classes.heroContent}
          display="flex"
          alignItems="center"
          style={{ backgroundImage: "url(./breadcrumb.webp)" }}
        >
          <Container fluid>
            <Typography
              className={classes.heroText}
              component="h1"
              variant="h2"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              App Masters
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
        <Books />
      </main>
    </React.Fragment>
  );
}
