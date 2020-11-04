import React from "react";
import {Typography, Container} from "@material-ui/core";
import { Link } from "@material-ui/core";
import {footer} from "../assets/css/makeStyles"

const Footer = () => {
  
  const classes = footer();

  return(
    <Container  className={classes.footer}>
      <Container  >
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
    </Container>
  );
}

export default Footer;