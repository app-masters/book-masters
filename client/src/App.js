import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Routes from './routes';
import { ProvideAuth } from './lib/auth';

const App = () => {
  return (
    <ProvideAuth>
      <div
        style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}
      >
        <CssBaseline />
        <Routes />
      </div>
    </ProvideAuth>
  );
};

export default App;
