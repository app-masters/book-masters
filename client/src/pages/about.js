import React from 'react';
import { Grid, Typography, Container, Box } from '@material-ui/core';
import PersonCard from '../components/PersonCard';
import { about } from '../assets/css/makeStyles';
import { people } from '../assets/info/people';

const About = () => {
  const classes = about();
  return (
    <Container className={classes.container}>
      <Box className={classes.heroContent}>
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
          Este projeto foi desenvolvido como projeto de seleção de estágio da
          App Masters. Temos como objetivo montar uma biblioteca pública, onde
          todos podem usufruir e adquirir conhecimento!
        </Typography>
        <Typography
          className={classes.heroDev}
          display="flex"
          component="h1"
          align="justify"
        >
          Desenvolvedores
        </Typography>

        <Grid
          className={classes.secondBox}
          container
          justify="center"
          spacing={2}
        >
          {people.map((p) => {
            return (
              <Grid item xs={12} md={6}>
                <PersonCard
                  image={p.image}
                  name={p.nome}
                  github={p.github}
                  linkedin={p.linkedin}
                />
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </Container>
  );
};

export default About;