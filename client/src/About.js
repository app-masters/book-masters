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
import igorWImg from "./assets/img/igor-w.jpg";
import igorBaio from "./assets/img/igor-baio.jpg";

import PersonCard from "./components/PersonCard";

const useStyles = makeStyles((theme) => ({
    icon: {
      marginRight: theme.spacing(2),
    },
    heroContent: {
      backgroundColor: theme.palette.background.paper,
      paddingTop: 40,
      marginBottom:'100px'
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
        marginBottom: 20,
    }
  }));
  

const pessoas = [
    {
        nome: "Jonathan Thomaz",
        image: jonathanThomazImg,
        github: "https://bit.ly/3nrod2a"
    },
    {
        nome: "Bruno Pinheiro",
        image: brunoMarcosImg,
        github: "https://bit.ly/3iFg0E4"
    },
    {
        nome: "Gabriel Silva",
        image: gabrielSilvaImg,
        linkedin: "https://bit.ly/2GAYt2E"
    },
    {
        nome: "Lavínia Beghini",
        image: laviniaBeghiniImg,
        linkedin: "https://bit.ly/3lrFLJO"
    },
    {
        nome: "Caio César",
        image: caioCesarImg,
        github: "https://bit.ly/3lqd8MV"
    },
    {
        nome: "Igor Westermann",
        image: igorWImg,
        linkedin: "https://www.linkedin.com/in/igor-westermann-15394216a/"
    },
    {
        nome: "Igor Baio",
        image: igorBaio,
        github: "https://github.com/IgorBaio"
    },
  ]
  
  
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

                    
                    <Grid className={classes.secondBox} container justify="center" spacing={2}>
                        {pessoas.map(p => {
                            return (
                                <Grid item xs={12} md={6}  >
                                    <PersonCard image={p.image} name={p.nome} github={p.github} linkedin={p.linkedin} />
                                </Grid>
                            )
                        })}
                    </Grid>
                </Box>     
            </Container>
        </React.Fragment>    
    );
}    