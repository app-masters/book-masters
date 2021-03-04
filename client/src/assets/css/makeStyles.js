import { makeStyles } from '@material-ui/core';
import { green, red } from '@material-ui/core/colors';

export const navbar = makeStyles((theme) => ({
  root: {
    display: 'flex',
    paddingBottom: '1px',
  },
  appBar: {
    background:
      'linear-gradient(90deg, rgba(25,175,251,1) 0%, rgba(125,211,255,1) 100%)',
    boxShadow:
      '0px 0px 0px 0px rgba(0,0,0,0.2), inset 0px 0px 0px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)',
  },
  btn: {
    color: '#ffffff',
    fontWeight: 300,
  },
  btnExit: {
    color: '#ffffff',
    fontWeight: 300,
    marginLeft: 'auto',
    borderColor: '#FFFFFF',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(3, 1),
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export const login = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: 'white',
  },
}));

export const footer = makeStyles((theme) => ({
  container: {
    maxWidth: 1200,
  },
  social: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  socialLink: {
    color: '#7F7F7F',
    marginLeft: 8,
  },
  footer: {
    bottom: 0,
    backgroundColor: '#F5F5FC',
    width: '100%',
    minHeight: 220,
    padding: '64px 16px',
  },
}));

export const spinner = makeStyles((theme) => ({
  spinner: {
    flex: 1,
    padding: 32,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

export const header = makeStyles((theme) => ({
  container: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    padding: 32,
  },
  bottom: {
    zIndex: 3,
    position: 'absolute',
    bottom: 16,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    position: 'relative',
    maxWidth: 1200,
    display: 'flex',
  },
  info: {
    zIndex: 2,
    maxWidth: 380,
  },
  title: {
    lineHeight: 'normal',
    color: '#223464',
    fontWeight: 500,
    fontSize: 50,
  },
  subtitle: {
    fontWeight: 200,
    fontSize: 18,
  },
  backgroundImage: {
    zIndex: 1,
    position: 'absolute',
    right: 0,
  },
}));

export const body = makeStyles((theme) => ({
  body: {
    height: '80vh',
  },
}));

export const booksContainer = makeStyles((theme) => ({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    flexWrap: 'wrap',
  },
}));

export const bookCard = makeStyles((theme) => ({
  root: {
    width: 345,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    margin: 20,
  },
  rootAction: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  bookStatus: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  status: {
    margin: '0 20px',
  },
  green: {
    color: '#fff',
    backgroundColor: green[500],
  },
  red: {
    color: '#fff',
    backgroundColor: red[500],
  },
  yellow: {
    color: '#fff',
    backgroundColor: '#FD9A24',
  },
  cover: {
    height: '200px',
  },
  header: {
    height: 120,
  },
  footer: {
    display: 'flex',
    justifyContent: 'flex-start',
    width: '100%',
  },
}));

export const about = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    paddingTop: 40,
    marginBottom: '100px',
  },
  heroText: {
    color: '#000000',
    fontSize: 50,
    marginTop: 20,
  },
  description: {
    color: '#000000',
    fontSize: 18,
    marginTop: 5,
    padding: 15,
  },
  heroDev: {
    color: '#000000',
    fontSize: 30,
    padding: 15,
    marginTop: 5,
  },
  link: {
    fontSize: 15,
    paddingLeft: 15,
  },
  spacing: {
    marginBottom: 5,
  },
  secondBox: {
    backgroundColor: '#ffffff',
    marginBottom: 20,
  },
  container: {
    marginTop: 40,
  },
}));

export const register = makeStyles((theme) => ({
  container: {
    padding: 0,
    marginTop: 60,
    textAlign: 'center',
  },
  buttonOutlined: {
    border: '1px solid #0ab6ff',
    color: '#0ab6ff',
    padding: '10px 20px',
    marginBottom: '20px',
    '&:hover': {
      color: '#ffffff',
      backgroundColor: '#0ab6ff',
    },
  },

  title: {
    paddingTop: 40,
  },
}));

export const personStyle = makeStyles((theme) => ({
  content: {
    display: 'flex',
    flexDirection: 'row',
  },
  info: {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    textAlign: 'center',
    paddingLeft: 10,
  },
  image: {
    borderRadius: '50%',
    width: '150px',
    height: '150px',
  },
}));

export const book = makeStyles((theme) => ({
  root: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    maxWidth: '1200px',
    width: '100%',
    margin: 16,
    alignItems: 'flex-start',
  },
  buttonOutlined: {
    border: '1px solid #0ab6ff',
    color: '#0ab6ff',
    padding: '10px 20px',
    marginBottom: '20px',
    '&:hover': {
      color: '#ffffff',
      backgroundColor: '#0ab6ff',
    },
  },
  formInput: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1,
  },
  textField: {
    width: '100%',
    marginRight: '10px',
  },
  button: {
    color: '#0ab6ff',
  },
}));

export const detailedBookCard = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    boxShadow:
      'inset 0px -3px 0px 0px rgba(10, 182, 255), 0px 0px 0px 0px rgba(0, 0, 0, 0.14), 0px 0px 3px 0px rgba(0, 0, 0, 0.12)',
    padding: '20px',
    minHeight: '500px',
    width: 'auto',
  },
  container: {
    maxHeight: 20,
    maxWidth: '100vw',
  },
  cover: {
    width: '100%',
    borderRadius: 5,
  },
  details: {
    overflow: 'auto',
    heigth: 200,
  },
  descriptionTitle: {
    fontSize: '18px',
    margin: '10px 0',
    fontWeight: '500',
    color: '#343a40',
  },
  description: {
    fontWeight: '300',
    fontStyle: 'normal',
    fontSize: '15px',
    color: '#6c757d',
  },
}));

export const lendingCard = makeStyles((theme) => ({
  root: {
    boxShadow:
      'inset 0px -3px 0px 0px rgba(10, 182, 255), 0px 0px 0px 0px rgba(0, 0, 0, 0.14), 0px 0px 3px 0px rgba(0, 0, 0, 0.12)',
    padding: '20px',
    width: 'auto',
  },
}));

export const confirmLending = makeStyles((theme) => ({
  qrCode: {
    width: '40%',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

export const modal = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    marginBottom: 32,
  },
  content: {
    backgroundColor: '#FFFFFF',
    maxWidth: 500,
    padding: 32,
    borderRadius: 5,
    minHeight: 400,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    textAlign: 'center',
  },
}));

export const search = makeStyles((theme) => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    maxWidth: 1280,
    width: '80%',
    maxWidth: 530,
    margin: 32,
    height: 60,
    backgroundColor: '#FFF',
    padding: 8,
    paddingLeft: 32,
    paddingRight: 8,
    borderRadius: 40,
    boxShadow: '0px 15px 30px 13px rgba(187, 187, 187, 0.25)',
  },
  input: {
    width: '100%',
    fontSize: 14,
    height: 35,
    fontWeight: 300,
    border: 'none',
    outline: 'none',
  },
  btn: {
    background:
      'linear-gradient(90deg, rgba(25,175,251,1) 0%, rgba(125,211,255,1) 100%)',
    color: '#FFFFFF',
  },
}));
