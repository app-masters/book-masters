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
import { Paper, Container, Box, List, ListItemText, ListItem } from '@material-ui/core';

const LendingCard = (props) => {
	
	
	const classes = detailedBookCard();

	return (

    <Paper className={classes.root}>
        <Typography variant="h5">Reservas</Typography>
        <Box component="div" overflow="auto" maxHeight={400}>
            <List>
                <ListItem>
                    <ListItemText primary="Fulano" secondary="Jan 9, 2014" />
                </ListItem>
                <ListItem>
                    <ListItemText primary="Fulano" secondary="Jan 9, 2014" />
                </ListItem>
                <ListItem>
                    <ListItemText primary="Fulano" secondary="Jan 9, 2014" />
                </ListItem>
                <ListItem>
                    <ListItemText primary="Fulano" secondary="Jan 9, 2014" />
                </ListItem>
                <ListItem>
                    <ListItemText primary="Fulano" secondary="Jan 9, 2014" />
                </ListItem>
            </List>                
        </Box>  
    </Paper>
    );
};

export default LendingCard;
