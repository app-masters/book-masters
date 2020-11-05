export default function preprocessEmail(email) {
    //const mailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    //const mailRegex = /\w+\@\w+\.(com|\edu|\org)(\.br)?/;
    const testRegex = /^[^@\s]+@[^@\s\.]+\.[^@\.\s]+$/;
    
    return (testRegex.test(email)) 
    
  };
