import React from 'react';
import { login } from '../assets/css/makeStyles';
import FormLogin from '../components/FormLogin';

const Login = () => {
  const classes = login();
  return (
    <div className={classes.container}>
      <FormLogin />
    </div>
  );
};

export default Login;
