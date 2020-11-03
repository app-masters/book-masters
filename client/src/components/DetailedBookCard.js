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
import { Grid } from '@material-ui/core';
import { Paper, Container, Box } from '@material-ui/core';

const DetailedBookCard = (props) => {
	
	
	const classes = detailedBookCard();

	return (

        <Paper className={classes.root}>
            <Grid container justify="flex-start" alignItems="flex-start">
                    <Grid item xs={12} sm={4} justify="center" alignItems="center">
                        <img src={props.img} alt='BookCover' className={classes.cover}/>
                    </Grid>
                    <Grid container xs={12} sm={8} >
                        <Grid item xs={12}>
                            <Typography component="h3" variant="h5"> {props.title} </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography>{props.autor}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                        <Typography variant='h6'>Descrição</Typography>
                        </Grid>
                        <Grid item xs={12} className={classes.details} >
                            <Box component="div" overflow="auto" style={{maxHeight:"300px"}}>
                                {props.description}
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            {props.tags.map((tag) => (
                                (<Chip label={tag} style={{marginTop:"20px"}} />)
                            ))}
                        </Grid>
                    </Grid>
                </Grid>
        </Paper>
    );
};

export default DetailedBookCard;
