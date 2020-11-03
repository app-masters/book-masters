import React, { useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link as RouterLink } from 'react-router-dom';
import book from '../assets/img/book.png';
import { lendingCard } from '../assets/css/makeStyles'
import { CardHeader } from '@material-ui/core';
import CardActions from '@material-ui/core/CardActions';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close'
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import { Grid } from '@material-ui/core';
import api from '../services/api';
import { Paper, Container, Box, List, ListItemText, ListItem } from '@material-ui/core';

const LendingCard = (props) => {
    const {lendings} = props
    const classes = lendingCard();

    const getUsers = async (id) => {
        try {
			const response = await api.get('/users/' + id);
			if (response.status !== 200) {
			  throw Error(response.statusText);
			}
			const json = response.data;
			return (json)
		}catch(error){

		}
    }

    const userName = (id) => {getUsers(id)
        .then(response => {
            return(response.name)
        })}

    if(lendings.length > 0){
        return (
            <Paper className={classes.root}>
                <Typography variant="h5">Reservas</Typography>
                <Box component="div" overflow="auto" maxHeight={400}>
                    <List>
                        { lendings.map((l) => {
                            if(l.status === "Reservado"){
                                return (<ListItem>
                                    <ListItemText primary={l.idUser} secondary={l.reservationDateInit} />
                                </ListItem>)
                            }
                            
                        })}
                    </List>                
                </Box>  
            </Paper>
        )
    }

	return (
        <Paper className={classes.root}>
        <Typography variant="h5">Reservas</Typography>
            <Typography variant="h6" style={{margin:"80px 0 80px 0 "}}>Nenhuma reserva foi feita para esse livro.</Typography>                 
    </Paper>
    
    )
};

export default LendingCard;
