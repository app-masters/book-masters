import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Hidden from "@material-ui/core/Hidden";
import Toolbar from "@material-ui/core/Toolbar";
import { Button } from "@material-ui/core";
import { Link as RouterLink } from 'react-router-dom';
import { navbar } from "../assets/css/makeStyles"

function Navbar() {

  const classes = navbar();


  return (
    <div className={classes.root}>
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
      <Hidden smUp implementation="css">
      </Hidden>
    </div>
  );
}

export default Navbar;
