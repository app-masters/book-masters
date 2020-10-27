import React from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { Link, BottomNavigation } from "@material-ui/core";
import {footer} from "../assets/css/makeStyles"

export const Footer = () => {
  
  const classes = footer();

  return(
    <BottomNavigation className={classes.footer}>
      <Container fluid>
        <Typography variant="h6" align="center" gutterBottom>
          App Masters
        </Typography>
        
        <Typography
          variant="subtitle1"
          align="center"
          component="p"
        >
          Acesse o site da App Masters em 
          <Link href="https://appmasters.io/en/"> appmasters.io/en/</Link>
        </Typography>
      
      </Container>
    </BottomNavigation>
  );
}