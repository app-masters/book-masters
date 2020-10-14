import React from "react";
import styled from "styled-components";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { Link } from "@material-ui/core";

export const Styles = styled.div`
  .footer {
    bottom: 0;
    height: auto;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #0ab6ff;
    padding-top: 60px;
    padding-bottom: 50px;
  }
`;
export const Footer = () => (
  <Styles>
    <footer className="footer">
      <Container fluid>
        <Typography variant="h6" align="center" gutterBottom>
          App Masters
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="textSecondary"
          component="p"
        >
          Acesse o site da App Masters em 
          <Link href="https://appmasters.io/en/"> appmasters.io/en/</Link>
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="textSecondary"
          component="p"
        >
          <Link href="https://appmasters.io/en/"> Sobre</Link>
        </Typography>
      </Container>
    </footer>
  </Styles>
);
