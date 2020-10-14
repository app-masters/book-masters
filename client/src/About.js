import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";

import gabrielSilvaImg from "./assets/img/gabriel-silva.png";
import jonathanThomazImg from "./assets/img/jonathan-thomaz.jpg";
import brunoMarcosImg from "./assets/img/bruno-marcos.jpg";
import laviniaBeghiniImg from "./assets/img/lavinia-beghini.jpg";
import caioCesarImg from "./assets/img/caio-cesar.jpg";

const useStyles = makeStyles((theme) => ({
    icon: {
      marginRight: theme.spacing(2),
    },
    heroContent: {
      backgroundColor: theme.palette.background.paper,
      paddingTop: 40,
      height: "50vh",
    },
    heroText: {
      fontFamily: "Poppins, sans-serif",
      color: "#000000",
      fontSize: 50,
      marginTop: 20,
    },
    description: {
        fontFamily: "Poppins, sans-serif",
        color: "#000000",
        fontSize: 18,
        marginTop: 5,
        padding: 15,
    },
    heroDev: {
        fontFamily: "Poppins, sans-serif",
        color: "#000000",
        fontSize: 30,
        padding: 15,
        marginTop: 5,
    },
    link: {
        fontFamily: "Poppins, sans-serif",
        fontSize: 15,
        paddingLeft: 15,
    },
    spacing: {
        marginBottom: 5,
    },
    secondBox: {
        backgroundColor: "#ffffff",
    }
  }));
  

export default function About() {
    const classes = useStyles();

    return (
        <React.Fragment>
            <CssBaseline />
            <Container fluid>
                <Box
                    className={classes.heroContent}>
                    <Typography
                        className={classes.heroText}
                        display="flex"
                        component="h1"
                        align="center"
                    >
                        Sobre
                    </Typography>
                    <Typography
                        className={classes.description}
                        display="flex"
                        align="justify"    
                    >
                        Este projeto foi desenvolvido como projeto de seleção de estágio da App Masters.
                        Temos como objetivo montar uma biblioteca pública, onde todos podem usufruir e adquirir
                        conhecimento!
                    </Typography> 
                    <Typography
                        className={classes.heroDev}
                        display="flex"
                        component="h1"
                        align="justify"
                    >
                        Desenvolvedores    
                    </Typography>
                </Box>  
            </Container>
            <Container fluid>
                <Box
                    className={classes.secondBox}>
                    <Grid container className={classes.spacing}>
                        <Grid item xs={12} md={3}>
                            <img width="200" height="200" src={gabrielSilvaImg}></img>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography
                                className={classes.heroDev}
                                display="flex"
                                component="h3"
                                align="justify"
                            >
                                Gabriel Silva
                            </Typography>
                            <Typography
                                className={classes.link}
                                display="flex"
                                align="justify"
                            >
                                <a target="_blank" href="https://bit.ly/2GAYt2E">https://bit.ly/2GAYt2E</a>
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid container className={classes.spacing}>
                        <Grid item xs={12} md={3}>
                            <img width="200" height="200" src={jonathanThomazImg}></img>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography
                                className={classes.heroDev}
                                display="flex"
                                component="h3"
                                align="justify"
                            >
                                Jonathan Thomaz
                            </Typography>
                            <Typography
                                className={classes.link}
                                display="flex"
                                align="justify"
                            >
                                <a target="_blank" href="https://bit.ly/3nrod2a">https://bit.ly/3nrod2a</a>
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid container className={classes.spacing}>
                        <Grid item xs={12} md={3}>
                            <img width="200" height="200" src={brunoMarcosImg}></img>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography
                                className={classes.heroDev}
                                display="flex"
                                component="h3"
                                align="justify"
                            >
                                Bruno Marcos
                            </Typography>
                            <Typography
                                className={classes.link}
                                display="flex"
                                align="justify"
                            >
                                <a target="_blank" href="https://bit.ly/3iFg0E4">https://bit.ly/3iFg0E4</a>
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid container className={classes.spacing}>
                        <Grid item xs={12} md={3}>
                            <img width="200" height="200" src={laviniaBeghiniImg}></img>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography
                                className={classes.heroDev}
                                display="flex"
                                component="h3"
                                align="justify"
                            >
                                Lavínia Beghini
                            </Typography>
                            <Typography
                                className={classes.link}
                                display="flex"
                                align="justify"
                            >
                                <a target="_blank" href="https://bit.ly/3lrFLJO">https://bit.ly/3lrFLJO</a>
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid container className={classes.spacing}>
                        <Grid item xs={12} md={3}>
                            <img width="200" height="200" src={caioCesarImg}></img>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography
                                className={classes.heroDev}
                                display="flex"
                                component="h3"
                                align="justify"
                            >
                                Caio César
                            </Typography>
                            <Typography
                                className={classes.link}
                                display="flex"
                                align="justify"
                            >
                                <a target="_blank" href="https://bit.ly/3lqd8MV">https://bit.ly/3lqd8MV</a>
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>     
            </Container>
        </React.Fragment>    
    );
}    