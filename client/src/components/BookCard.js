import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import book from '../assets/img/book.png';
import { bookCard } from '../assets/css/makeStyles'
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close'
import PauseIcon from '@material-ui/icons/Pause';
import {Avatar, CardActions, CardHeader, Typography, Button, CardMedia, CardContent, Card, CardActionArea} from '@material-ui/core';

const BookCard = (props) => {

	const classes = bookCard();
	
	let status = () => { 
		if(props.book.status === "Disponível"){
			return (
				<CardContent className={classes.bookStatus}>
					<Avatar variant="rounded" className={classes.green}><DoneIcon /></Avatar>
					<Typography className={classes.status} variant='h6'>Livro disponível</Typography>
				</CardContent>
			)
		}else if(props.book.status === "Reservado"){
			return(
				<CardContent className={classes.bookStatus}>
					<Avatar variant="rounded" className={classes.yellow}><PauseIcon /></Avatar>
					<Typography className={classes.status} variant='h6'>Livro reservado</Typography>
				</CardContent>
			)
		}else{
			return(
				<CardContent className={classes.bookStatus}>
					<Avatar variant="rounded" className={classes.red}><CloseIcon /></Avatar>
					<Typography className={classes.status} variant='h6'>Livro alugado</Typography>
				</CardContent>
			)	
		}
	}

	return (
		<Card className={classes.root} variant="outlined">
			<CardActionArea className={classes.rootAction} component={RouterLink} to={{
						pathname: `/products/${props.book._id}`,
						state: props.book
					}}>
				<CardHeader
					title={props.book.title}
					subheader={props.book.autor}
					className={classes.header}
				/>
				<CardMedia
					component='img'
					className={classes.cover}
					image={props.book.img ? props.book.img : book}
					title='Image title'
				/>
				{status()}
			</CardActionArea>
			<CardActions className={classes.footer}>
			<Button component={RouterLink} to={{
						pathname: `/products/${props.book._id}`,
						state: props.book
					}}
					size="large">
				Ver mais
			</Button>
			</CardActions>
		</Card>
	);
};

export default BookCard;
