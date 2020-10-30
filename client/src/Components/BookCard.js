import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link as RouterLink } from 'react-router-dom';
import book from '../assets/img/book.png';
import { bookCard } from '../assets/css/makeStyles'
import { CardHeader } from '@material-ui/core';
import CardActions from '@material-ui/core/CardActions';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close'
import Avatar from '@material-ui/core/Avatar';

const BookCard = (props) => {
	const statusAlugado = props.book.status !== 'Disponível' ? true : false;
	
	let text = !statusAlugado ? 'Livro disponível' : 'Livro alugado';
	let propsStyle = { color: !statusAlugado ? '#0ab6ff' : '#a84432' };
	
	const classes = bookCard(propsStyle);
	
	let avatar = statusAlugado	? 
		<Avatar variant="rounded" className={classes.red}><CloseIcon /></Avatar> :
		<Avatar variant="rounded" className={classes.green}><DoneIcon /></Avatar>



	return (
			<Card className={classes.root} variant="outlined">
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
				<CardContent className={classes.bookStatus}>
					{avatar}
					<Typography className={classes.status} variant='h6'>{text}</Typography>
				</CardContent>
				<CardActions className={classes.footer}>
				<Button component={RouterLink} to={{
							pathname: `/products/${props.book._id}`,
							state: {
									id: props.book._id,
									name: props.book.title,
									autor: props.book.autor,
									description: props.book.description,
									img: props.book.img,
									status: props.book.status,
							}
						}}
						size="large">
         			Ver mais
        		</Button>
				</CardActions>
			</Card>
	);
};

export default BookCard;
