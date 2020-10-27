import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { createStyles, makeStyles } from '@material-ui/core';
import book from '../assets/img/book.png';

import withStyles from '@material-ui/core/styles/withStyles';

export const Styles = styled.div`
	.cover {
		height: 120px;
		width: auto;
		padding-top: 20px;
	}

	.details {
		display: flex;
		flex-direction: column;
	}
	.content {
		flex: '1 0 auto';
	}
	.button-div {
		text-align: center;
		padding: 10px;
	}
	a {
		text-decoration: none;
	}
	.btn-form-available {
		border: 1px solid #a84432;
		color: #a84432;
	}
`;

const useStyles = makeStyles((theme) =>
	createStyles({
		root: {

			height: 'auto',
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'space-between',
		},
		cardBody: {
			height: '100%',
			display: 'flex',
			flexDirection: 'row',
			justifyContent: 'space-between',
		},
		bookInfo: {
			width: '100%',
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'flex-start',
			alignItems: 'flex-start',
			padding: '1rem',
			textAlign: 'left',
		},
		bookStatus: {
			width: '100%',
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			justifyContent: 'center',
			padding: 5,
			minHeight: 50,
    },
    cover : {
      height: 150,
      width: 'auto',
      padding: '10px'
    },
		btnForm: (props) => ({
			border: `1px solid ${props.color}`,
			color: props.color,
		}),
	})
);

const BookCard = (props) => {
	const status = props.book.status === 'true' ? true : false;
	const text = !status ? 'Livro disponível' : 'Livro alugado';

	const propsStyle = { color: !status ? '#0ab6ff' : '#a84432' };
	const classes = useStyles(propsStyle);

	return (
		<Styles>
			<Card className={classes.root}>
				<div className={classes.cardBody}>
					<div>
						<CardMedia
							component='img'
							className={classes.cover}
							image={props.book.img ? props.book.img : book}
							title='Image title'
						/>
					</div>
					<CardContent className={classes.bookInfo}>
						<Typography gutterBottom variant='h5' component='h2' >
							{props.book.title}
						</Typography>
						<Typography variant='subtitle1' color='textSecondary'>
							{props.book.autor}
						</Typography>
					</CardContent>
				</div>

				<div className={classes.bookStatus}>
					<Typography>{text}</Typography>
					<Link
						to={{
							pathname: `/products/${props.book._id}`,
							state: {
								details: {
									id: props.book._id,
									name: props.book.title,
									autor: props.book.autor,
									description: props.book.description,
									img: props.book.img,
									status: props.book.status,
								},
							},
						}}
					>
						<Button className={`${classes.btnForm}`} variant='outlined'>
							Ver mais
						</Button>
					</Link>
				</div>
			</Card>
		</Styles>
	);
};

export default withStyles(useStyles)(BookCard);
