import React from 'react';
import { detailedBookCard } from '../css/makeStyles'
import { Paper, Box, Grid, Chip, Typography } from '@material-ui/core';

const DetailedBookCard = (props) => {
	
	const classes = detailedBookCard();
    const {book} = props
	return (

        <Paper className={classes.root}>
            <Grid container justify="flex-start" alignItems="flex-start">
                    <Grid item xs={12} sm={4}>
                        <img src={book.img} alt='BookCover' className={classes.cover}/>
                    </Grid>
                    <Grid item xs={12} sm={8} >
                        <Grid item xs={12}>
                            <Typography>ISBN: {book.isbn}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography component="h3" variant="h4"> {book.title} </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="h5">{book.autor}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="h6">Editora {book.editora}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography>Ano de publicação: {book.anoPublicacao}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                        <Typography variant='h6'>Descrição</Typography>
                        </Grid>
                        <Grid item xs={12} className={classes.details} >
                            <Box component="div" overflow="auto" style={{maxHeight:"200px", maxWidth:"95%"}}>
                                {book.description}
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            {book.tag.map((t) => 
                                <Chip key={t} label={t} style={{marginTop:"20px"}} />

                            )}
                        </Grid>
                    </Grid>
                </Grid>
        </Paper>
    );
};

export default DetailedBookCard;
