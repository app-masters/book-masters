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
          className={classes.description}
          display="flex"
          align="justify"
        >
          Esta é a biblioteca pública da App Masters com livros de programação, inovação e tecnologia.<br/>
          Foi desenvolvido inicialmente como projeto de seleção para estágio na empresa. Atualmente é mantido pela equipe da App Masters e eventualmente por candidatos em processo de seleção.
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
