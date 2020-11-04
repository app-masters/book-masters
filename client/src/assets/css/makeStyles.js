
import { makeStyles } from '@material-ui/core';
import { green, red } from '@material-ui/core/colors';


export const navbar = makeStyles((theme) => ({
    root: {
      display: "flex",
      paddingBottom: "1px",
    },
    appBar: {
      backgroundColor: "#0ab6ff",
      boxShadow:
        "0px 0px 0px 0px rgba(0,0,0,0.2), inset 0px 0px 0px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
    },
    btn: {
      fontFamily: "Poppins, sans-serif",
      color: "#ffffff",
      height: "100%"
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    toolbar: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: theme.spacing(3, 1),
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  }));

export const footer = makeStyles((theme) => ({
    footer: {
        bottom: 0,
        margin: 0,
        height: "auto",
        width: "100vw",
        maxWidth: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#0ab6ff",
        paddingTop: "60px",
        paddingBottom: "50px",
        color:"white",
        backgroundImage: "url(./breadcrumb.webp)" ,
    },
  }));

export const spinner = makeStyles((theme) => ({
    spinner: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "80vh",
    },
  }));
  
export const header = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    paddingTop: 40,
    height: "50vh",
    backgroundImage: "url(./breadcrumb.webp)",
    display:"flex",
    alignItems:"center",
  },
  heroText: {
    fontFamily: "Poppins, sans-serif",
    color: "#ffffff",
  },
}));

export const body = makeStyles((theme) => ({
  body: {
    height: "80vh",
  },
}));

export const booksContainer = makeStyles((theme) => ({
  container:{
    alignItems:"center", 
    justifyContent:"center", 
    display:"flex", 
    flexWrap:"wrap"
  },
}));

export const bookCard = makeStyles((theme) => ({
		root: {
      width: 345,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      margin: 20,
		},
		bookStatus: {
			width: '100%',
			display: 'flex',
			flexDirection: 'row',
			alignItems: 'center',
			justifyContent: 'center',
			margin: 10,
    },
    status:{
      margin: "0 20px",
    },
    green: {
      color: '#fff',
      backgroundColor: green[500],
    },
    red: {
      color: '#fff',
      backgroundColor: red[500],
    },
    yellow:{
      color: '#fff',
      backgroundColor: "#FD9A24",
    },
    cover : {
      height: "200px",
      width: "auto",
    },
    header: {
      height:120,
    },
    footer: {
      display:"flex",
      justifyContent: "flex-start",
      width:"100%",
    },
	})
);

export const about = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    paddingTop: 40,
    marginBottom:'100px'
  },
  heroText: {
    fontFamily: "Poppins, sans-serif",
    color: "#000000",
    fontSize: 50,
    marginTop: 20,
  },
  description: {
      fontFamily: "Poppins, sans-serif",
      color: "#000000",
      fontSize: 18,
      marginTop: 5,
      padding: 15,
  },
  heroDev: {
      fontFamily: "Poppins, sans-serif",
      color: "#000000",
      fontSize: 30,
      padding: 15,
      marginTop: 5,
  },
  link: {
      fontFamily: "Poppins, sans-serif",
      fontSize: 15,
      paddingLeft: 15,
  },
  spacing: {
      marginBottom: 5,
  },
  secondBox: {
      backgroundColor: "#ffffff",
      marginBottom: 20,
  },
  container:{
    marginTop:40,
  }
}));

export const register = makeStyles((theme) => ({
  container:{
    padding:0,
    marginTop:60,
    textAlign:"center",
  },
  title:{
    paddingTop: 40,
  },
}
));

export const personStyle = makeStyles((theme) => ({
  content: {
   display: 'flex',
   flexDirection: 'row'
  },
  info: {
      display: 'flex',
      width: '100%',
      flexDirection: 'column',
      justifyContent: 'space-around',
      alignItems: 'center',
      textAlign:'center',
      paddingLeft: 10
  },
  image:{
      borderRadius: '50%',
      width: "150px",
      height: "150px",
  },
}));

export const product = makeStyles((theme) => ({
  container:{
    alignItems:"center", 
    justifyContent:"center", 
    minHeight:'75vh',
    width:'98vw',
    margin:"70px auto auto auto",
  },
  buttonOutlined: {
    border: "1px solid #0ab6ff",
    color: "#0ab6ff",
    padding: "10px 20px",
    marginBottom: "20px",
  },
  formInput: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flexGrow: 1,
  },
  textField: {
    width: "100%",
    marginRight: "10px",
  },
  button:{
    color: "#0ab6ff",
  }
}));

export const detailedBookCard = makeStyles((theme) => ({
  root: {
    boxShadow: "inset 0px -3px 0px 0px rgba(10, 182, 255), 0px 0px 0px 0px rgba(0, 0, 0, 0.14), 0px 0px 3px 0px rgba(0, 0, 0, 0.12)",
    padding: "20px",
    minHeight:"500px",
    width:"auto",
    
  },
  container:{
    maxHeight: 20,
    maxWidth: "100vw",
  },
  cover: {
    margin: 20,
    width: "80%",
		maxWidth: "250px",
  },
  details: {
    overflow: 'auto',
    heigth: 200,
  },
  descriptionTitle: {
		fontSize: "18px",
		margin: "10px 0",
		fontWeight: "500",
		fontFamily: "Roboto, sans-serif",
    color: "#343a40",
  },
  description: {
		fontWeight: "300",
		fontStyle: "normal",
		fontSize: "15px",
		color: "#6c757d",
	},
}));

export const lendingCard = makeStyles((theme) => ({
  root: {
    boxShadow: "inset 0px -3px 0px 0px rgba(10, 182, 255), 0px 0px 0px 0px rgba(0, 0, 0, 0.14), 0px 0px 3px 0px rgba(0, 0, 0, 0.12)",
    padding: "20px",
    width:"auto",
  },
}));

export const confirmLending = makeStyles((theme) => ({
  qrCode:{
  width: '40%'
},
content:{
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center'
}
})); 
