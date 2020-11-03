import React from 'react';
import Typography from '@material-ui/core/Typography';
import { detailedBookCard } from '../assets/css/makeStyles'
import Chip from '@material-ui/core/Chip';
import { Grid } from '@material-ui/core';
import { Paper, Box } from '@material-ui/core';

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
