import React, {useState, useEffect} from 'react';
import { lendingCard } from '../assets/css/makeStyles'
import api from '../services/api';
import { Paper, Box, List, ListItemText, ListItem, Typography } from '@material-ui/core';

const LendingCard = (props) => {
    const {lendings} = props
    console.log(lendings)
    const classes = lendingCard();
    const [users, setUsers] = useState([]);

    useEffect( () => {
		getUsers()
	}, [])

    const getUsers = async () => {
        try {
			const response = await api.get('/users');
			if (response.status !== 200) {
			  throw Error(response.statusText);
			}
			const json = response.data;
			setUsers(json)
		}catch(error){

		}
    }
    
    const getUserName = (id) => {
        for (let index = 0; index < users.length; index++) {
            if(id === users[index]._id){
                return(users[index].name)
            }
            
        }
    }

    if(lendings.length > 0){
        return (
            <Paper className={classes.root}>
                <Typography variant="h5">Reservas</Typography>
                <Box component="div" overflow="auto" maxHeight={200}>
                    <List>
                        { lendings.map((l) => {
                            if(l.status === "Reservado"){
                                return (<ListItem>
                                    <ListItemText key={l.idUser} primary={getUserName(l.idUser)} secondary={l.reservationDateInit} />
                                </ListItem>)
                            }else{
                              return  ""
                            }
                            
                            })
                        }
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
