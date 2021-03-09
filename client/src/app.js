import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Routes from './routes';
import { ProvideAuth } from './lib/auth';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './styles/theme';

const App = () => {
  return (
    <ProvideAuth>
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <CssBaseline />
        <ThemeProvider theme={theme}>
          <Routes />
        </ThemeProvider>
      </div>
    </ProvideAuth>
  );
};

export default App;
