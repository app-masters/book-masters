import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import styled from "styled-components";
import Box from "@material-ui/core/Box";
import { Link } from "react-router-dom";

export const Styles = styled.div`
  .MuiGrid-container {
    padding-top: 10px !important;
    padding-bottom: 10px !important;
  }
  .fKeUbW {
    height: 100% !important;
    display: flex !important;
    flex-direction: column !important;
  }
  .MuiTypography-body1 {
    text-align: center;
  }
  .MuiTypography-h5 {
    font-size: 1.5rem;
    font-family: "Roboto", "Helvetica", "Arial", sans-serif;
    font-weight: 500;
    line-height: 1.334;
    letter-spacing: 0em;
    text-align: center;
  }
  .MuiPaper-elevation1 {
    box-shadow: inset 0px -3px 0px 0px rgba(10, 182, 255),
      0px 0px 0px 0px rgba(0, 0, 0, 0.14), 0px 0px 3px 0px rgba(0, 0, 0, 0.12);
  }
  .MuiCardContent-root {
    padding: 14px 8px 8px 8px;
    height: 130px;
  }
  .MuiButton-outlined {
    border: 1px solid #0ab6ff;
    color: #0ab6ff;
    padding: 5px 15px;
    margin-bottom: 12px;

    &:hover {
      background-color: #0ab6ff;
      color: #fff;
    }
  }
`;

class BookCard extends Component {
  render() {
    return (
      <Styles style={{ marginTop: 20, marginBottom: 20 }}>
        <Container className="cardGrid">
          <Card
            className="card"
            style={{
              minHeight: "420px",
            }}
          >
            <CardMedia
              style={{ paddingTop: "10px" }}
              component="img"
              className="cardMedia"
              image={this.props.book.img}
              title="Image title"
            />

            <CardContent className="cardContent">
              <Typography gutterBottom variant="h5" component="h2">
                {this.props.book.name}
              </Typography>
              <Typography>{this.props.book.autor}</Typography>
            </CardContent>
            <Box display="flex" justifyContent="center">
              <Link
                to={{
                  pathname: `/products/${this.props.book.id}`,
                  state: {
                    details: {
                      id: this.props.book.id,
                      name: this.props.book.name,
                      autor: this.props.book.autor,
                      description: this.props.book.description,
                      img: this.props.book.img,
                    },
                  },
                }}
              >
                <Button variant="outlined">Ver mais</Button>
              </Link>
            </Box>
          </Card>
        </Container>
      </Styles>
    );
  }
}

export default BookCard;
