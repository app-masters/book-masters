import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  overrides: {
    MuiButton: {
      contained: {
        background:
          'linear-gradient(90deg, rgba(25,175,251,1) 0%, rgba(125,211,255,1) 100%)',
        borderRadius: 3,
        border: 0,
        color: 'white',
        height: 48,
        padding: '0 30px',
      },
    },
  },
});

export default theme;