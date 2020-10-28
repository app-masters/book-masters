import React from 'react';


import {FaLinkedin, FaGithub} from 'react-icons/fa'

import { Card, CardContent, Link, makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    content: {
     display: 'flex',
     flexDirection: 'row'
    },
    info: {
        display: 'flex',
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        textAlign:'center',
        paddingLeft: 10
    },
    image:{
        borderRadius: '50%',
        width: "150px",
        height: "150px",
    }
  }));
  

const PersonCard = (props) => {
    const classes = useStyles();

    return (
        <Card elevation={3}>
            <CardContent className={classes.content} >
                    <img  className={classes.image} src={props.image} alt="Person"/>

                    <div className={classes.info}>
                    
                    <Typography variant="h5" gutterBottom color="textPrimary">{props.name}</Typography>
                 
                    {props.linkedin ?
                        <Link variant="h4" href={props.linkedin} target="_blank" rel="noopener noreferrer">
                            <FaLinkedin />
                        </Link >
                    :
                    ""
                    }
                    {props.github ?
                        <Link  variant="h4"  href={props.github} target="_blank" rel="noopener noreferrer">
                            <FaGithub />
                        </Link >
                    :
                    ""
                    }
                    </div>
                
            </CardContent>
        </Card>

    )
}

export default PersonCard;