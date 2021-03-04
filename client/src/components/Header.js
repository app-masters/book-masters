import React from 'react';
import { Typography } from '@material-ui/core';
import { header } from '../assets/css/makeStyles';
import useWindowSize from '../utils/useWindowSize';
import { breakpoints } from '../utils/constraints';

const Header = ({ extra }) => {
  const classes = header();
  const size = useWindowSize();

  const compact = size.width <= breakpoints.laptop;
  return (
    <main
      className={classes.container}
      style={{ paddingBottom: compact ? 145 : 64 }}
    >
      <div
        className={classes.content}
        style={{
          minHeight: compact ? 200 : 560,
          alignItems: compact ? 'flex-start' : 'center',
          justifyContent: compact ? 'center' : 'flex-start',
        }}
      >
        <div className={classes.info}>
          <Typography className={classes.title}>Book Masters</Typography>
          <Typography className={classes.subtitle}>
            Biblioteca da appmasters, aqui você encontra os mais variados livros
            de programação. Venha conferir e ainda pegue um emprestado.
          </Typography>
        </div>
        {!compact && (
          <img
            src={require('../assets/img/home-image.png')}
            className={classes.backgroundImage}
          />
        )}
      </div>
      <div className={classes.bottom}>{extra}</div>
    </main>
  );
};

export default Header;
