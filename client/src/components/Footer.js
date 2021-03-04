import React from 'react';
import { Typography, Container, Grid } from '@material-ui/core';
import { footer } from '../assets/css/makeStyles';
import { Facebook, Instagram, LinkedIn } from '@material-ui/icons';
import useWindowSize from '../utils/useWindowSize';
import { breakpoints } from '../utils/constraints';

const Footer = () => {
  const classes = footer();
  const size = useWindowSize();

  const compact = size.width <= breakpoints.laptop;

  return (
    <div className={classes.footer}>
      <Container className={classes.container}>
        <Grid
          container
          spacing={2}
          direction={compact ? 'column-reverse' : 'row'}
        >
          <Grid item xs={12} md={4} style={{ marginTop: 8 }}>
            <Grid container justify="center">
              <div style={{ display: 'inline-block' }}>
                <a
                  href="http://appmasters.io/pt"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={require('../assets/img/appmasters.png')}
                    width={200}
                  />
                </a>
                <div className={classes.social}>
                  <a
                    href="https://pt-br.facebook.com/appmasters.io/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={classes.socialLink}
                  >
                    <Facebook />
                  </a>
                  <a
                    href="https://www.instagram.com/appmasters.io/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={classes.socialLink}
                  >
                    <Instagram />
                  </a>
                  <a
                    href="https://www.linkedin.com/company/appmasters.io/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={classes.socialLink}
                  >
                    <LinkedIn />
                  </a>
                </div>
              </div>
            </Grid>
          </Grid>
          <Grid item xs={12} md={4} style={{ marginTop: 8 }}>
            <Grid container justify={compact ? 'center' : 'flex-start'}>
              <div>
                <Typography
                  variant="h6"
                  style={{
                    fontWeight: '400',
                    textAlign: compact ? 'center' : 'left',
                  }}
                >
                  Endereço
                </Typography>
                <Typography variant="body1" style={{ fontWeight: '300' }}>
                  Av. Barão do Rio Branco 3480
                  <br />
                  5º andar, Sala 6
                  <br />
                  Bairro Alto dos Passos, Juiz de Fora - MG CEP 36025-020
                </Typography>
              </div>
            </Grid>
          </Grid>
          <Grid item xs={12} md={4} style={{ marginTop: 8 }}>
            <Grid container justify="center">
              <a
                href="https://g.page/AppMasters?share"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={require('../assets/img/map.png')} width={60} />
              </a>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Footer;
