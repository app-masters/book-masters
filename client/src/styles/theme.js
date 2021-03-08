import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  overrides: {
    MuiOutlinedInput: {
      root: {
          position: 'relative',
          '& $notchedOutline': {
              borderColor: 'rgba(0, 0, 0, 0.23)',
          },
          '&:hover:not($disabled):not($focused):not($error) $notchedOutline': {
              borderColor: '#19affb',
              // Reset on touch devices, it doesn't add specificity
              '@media (hover: none)': {
                  borderColor: 'rgba(0, 0, 0, 0.23)',
              },
          },
          '&$focused $notchedOutline': {
              borderColor: '#19affb',
              borderWidth: 2,
          },
      },
  },
  MuiFormLabel: {
      root: {
          '&$focused': {
              color: '#19affb'
          }
      }
  },
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
