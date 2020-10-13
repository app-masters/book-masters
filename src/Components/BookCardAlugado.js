import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { createStyles, makeStyles } from "@material-ui/core";

export const Styles = styled.div`
  .root {
    display: flex;
    flex-direction: column;
    min-height: 200px;
    opacity: 0.8;
  }
  .cover {
    width: 151px;
    padding-top: 20px;
  }
  .card-body {
    display: flex;
    flex-direction: row;
  }
  .details {
    display: flex;
    flex-direction: column;
  }
  .content {
    flex: "1 0 auto";
  }
  .button-div {
    text-align: center;
    padding: 10px;
  }
  a {
    text-decoration: none;
  }
  .btn-form {
    border: 1px solid #a84432;
    color: #a84432;
  }
`;

const useStyles = makeStyles((theme) =>
	createStyles({
		root: {
			flexGrow: 1,
		},

		details: {
      display: 'flex',
      flexDirection: 'column',
      backgroundColor:'black'
		},
		image: {
			width: '100%',
		},
	})
);


export default class BookCardAlugado extends Component {
  render() {
    const disponibilidade = JSON.parse(
      localStorage.getItem(`@bookStatus/Book ID: ${this.props.book.id}`)
    );

    console.log(disponibilidade);

    return (
      <Styles>
        <Card className="root">
          <div className="card-body">
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
                  {this.props.book.title}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  {this.props.book.autor}
                </Typography>
                
              </CardContent>
            </div>
          </div>
          <div className="button-div">
            <Typography>Livro alugado</Typography>
            <Link
                to={{
                  pathname: `/products/${this.props.book._id}`,
                  state: {
                    details: {
                      id: this.props.book.id,
                      name: this.props.book.title,
                      autor: this.props.book.autor,
                      description: this.props.book.description,
                      img: this.props.book.img,
                    },
                  },
                }}
              >
                <Button className="btn-form" variant="outlined">Ver mais</Button>
              </Link>
        </div>
        </Card>
        
      </Styles>
    );
  }
}
