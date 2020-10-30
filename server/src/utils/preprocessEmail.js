export default function preprocessEmail(email) {
    const verificationRegex = /\w+\@\w+\.(com|\edu|\org)(\.br)?/;
    
    if (verificationRegex.exec(email)) 
      return email.trim().toLowerCase();
    else 
      return null;
  };