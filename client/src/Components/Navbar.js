
import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { Button, Container } from "@material-ui/core";
import { navbar } from "../assets/css/makeStyles"


const Navbar = () => {

  const classes = navbar();
  
  return (
    <Container className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Button className={classes.btn} href="/">
            Book Masters
          </Button>
          <Button className={classes.btn} href="/register">
            Registro
          </Button>
          <Button className={classes.btn} href="/about">
            Sobre
          </Button>
        </Toolbar>
      </AppBar>
    </Container>
  );
}

export default Navbar;
