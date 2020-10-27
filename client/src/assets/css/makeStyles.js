import { makeStyles, useTheme } from "@material-ui/core/styles";


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
        height: "auto",
        width: "100%",
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
