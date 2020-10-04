import React from "react";
import styled from "styled-components";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

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
          Footer
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="textSecondary"
          component="p"
        >
          Something here to give the footer a purpose!
        </Typography>
      </Container>
    </footer>
  </Styles>
);
