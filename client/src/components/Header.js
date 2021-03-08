import React from 'react';
import { Typography } from '@material-ui/core';
import { header } from '../assets/css/makeStyles';
import useWindowSize from '../utils/useWindowSize';

const Header = ({ extra }) => {
  const classes = header();
  const size = useWindowSize();

  return (
    <main
      className={classes.container}
      style={{ paddingBottom: size.compact ? 145 : 64 }}
    >
      <div
        className={classes.content}
        style={{
          minHeight: size.compact ? 200 : 560,
          alignItems: size.compact ? 'flex-start' : 'center',
          justifyContent: size.compact ? 'center' : 'flex-start',
        }}
      >
        <div className={classes.info}>
          <Typography className={classes.title}>Book Masters</Typography>
          <Typography className={classes.subtitle}>
            Biblioteca pública com livros de programação e tecnologia, acessível
            para a comunidade de Juiz de Fora e região
          </Typography>
        </div>
        {!size.compact && (
          <img
            src={require('../assets/img/home-image.png')}
            className={classes.backgroundImage}
            alt="home-background"
          />
        )}
      </div>
      <div className={classes.bottom}>{extra}</div>
    </main>
  );
};

export default Header;
