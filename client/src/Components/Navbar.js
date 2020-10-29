import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Hidden from "@material-ui/core/Hidden";
import Toolbar from "@material-ui/core/Toolbar";
import { useTheme } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import { navbar } from "../assets/css/makeStyles"

function Navbar() {

  const classes = navbar();

  return (
    <div className={classes.root}>
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
      <Hidden smUp implementation="css">
      </Hidden>
    </div>
  );
}

export default Navbar;
