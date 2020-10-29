
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
        width: "100%",
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
		btnForm: (theme) => ({
			border: `1px solid ${theme.color}`,
      color: theme.color,
      alignSelf:"flex-start",
		}),
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
	btnForm: {
		border: "1px solid #0ab6ff",
		color: "#0ab6ff",
		padding: "11px 15px",
		margin: "0px 5px 10px 5px",
  },
  container:{
    marginTop:40,
  }, 
  root: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 151,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
}));
