import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import styled from "styled-components";
import { Link } from "react-router-dom";

export const Styles = styled.div`
  .root {
    display: flex;
    height: 200px;
  }
  .cover {
    width: 151px;
    padding-top: 20px;
  }
  .details {
    display: flex;
    flex-direction: column;
  }
  .content {
    flex: "1 0 auto";
  }
  .teste {
    text-align: center;
  }
`;

export default class BookCardDisponivel extends Component {
  render() {
    const disponibilidade = JSON.parse(
      localStorage.getItem(`@bookStatus/Book ID: ${this.props.book.id}`)
    );

    //console.log(disponibilidade);

    return (
      <Styles>
        <Card className="root">
          <div>
            <CardMedia
              component="img"
              className="cover"
              image={this.props.book.img}
              title="Image title"
            />
          </div>
          <div className="details">
            <CardContent className="content">
              <Typography gutterBottom variant="h5" component="h2">
                {this.props.book.name}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {this.props.book.autor}
              </Typography>
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
            </CardContent>
          </div>
        </Card>
        <div className="teste">
          <Typography>Livro disponivel</Typography>
        </div>
      </Styles>
    );
  }
}
