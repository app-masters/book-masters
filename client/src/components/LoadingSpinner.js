import React from 'react';
import ReactLoading from 'react-loading';
import { spinner } from '../assets/css/makeStyles';

const LoadingSpinner = () => {
  const classes = spinner();

  return (
    <div className={classes.spinner}>
      <ReactLoading type="spin" color="#0ab6ff" />
    </div>
  );
};

export default LoadingSpinner;
