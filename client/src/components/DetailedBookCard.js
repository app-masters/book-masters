import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link as RouterLink } from 'react-router-dom';
import book from '../assets/img/book.png';
import { detailedBookCard } from '../assets/css/makeStyles'
import { CardHeader } from '@material-ui/core';
import CardActions from '@material-ui/core/CardActions';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close'
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';

const DetailedBookCard = (props) => {
	
	
	const classes = detailedBookCard();

	return (

        <Card className={classes.root}>
            <CardMedia
                    component="img"
                    className={classes.cover}
                    image={props.img}
                    title={props.name}
                />
            <div className={classes.details}>
                <CardContent className={classes.content}>
                    <Typography component="h5" variant="h5">
                        {props.title}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                        {props.autor}
                    </Typography>
                    <Typography className={classes.descriptionTitle} variant='h2'>
                            Descrição
                        </Typography>
                    <Typography className={classes.description}>{props.description}</Typography>
                    {props.tags.map((tag) => (
                        (<Chip label={tag} style={{marginTop:"20px"}} />)
                    ))}
                </CardContent>
            </div>
        </Card>
    );
};

export default DetailedBookCard;
