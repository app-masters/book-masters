import React from "react";
import {AppBar, Toolbar, Button, Container} from "@material-ui/core";
import { Link as RouterLink } from 'react-router-dom';
import { navbar } from "../assets/css/makeStyles"


const Navbar = () => {

  const classes = navbar();
  
  return (
    <Container className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Button component={RouterLink} to="/" size="large" className={classes.btn}>
                Book Masters
          </Button>
          <Button component={RouterLink} to="/register" size="large" className={classes.btn}>
              Registro  
          </Button>
          <Button component={RouterLink} to="/about" size="large" className={classes.btn}>
              Sobre
          </Button>
        </Toolbar>
      </AppBar>
    </Container>
  );
}

export default Navbar;
