import Lending from "../models/Lending";
import User from "../models/User"

const verifyValidEmail = (email) =>{
  const verification = /\w+\@\w+\.(com|\edu|\org)(\.br)?/;

  if(verification.exec(email))
    return email.trim().toLowerCase();
  else
    return null;
  
}

export default {
  async getAll(req, res) {
    const response = await Lending.find()

    return res.json(response);
  },
  async getById(req, res) {
    const response = await Lending.findById(req.params.id)

    return res.json(response)
  },
  async lending(req, res) {
    const lending = await req.body;
    const email = verifyValidEmail(lending.person.email);
    if(!email)
      return null;
    const user = await User.find({ email});
    
    let idUser ;
    if(user.length>0){
      console.log(user[0]._id)
      idUser = user[0]._id;
    }else{
      const userJson = {
        email: email,
        name: lending.person.name,
        phoneNumber: lending.person.phoneNumber
      }
       let newUser = await User.create(userJson);
       let responseUser = res.json(newUser)
       console.log(responseUser._id)
       idUser = newUser._id;
    }

    const lendingJson = { 
      idBook:lending.id_book, 
      idUser: idUser
      
    };
    
    const response = await Lending.create(lendingJson);
    
    return res.json(response);

  },
  async update(req, res) {
    const response = await Lending.findOneAndUpdate({ _id: req.params.id}, req.body, {
      new: true,
    })

    return res.json(response)
  },
  async delete(req, res) {
    await Lending.deleteOne({ _id: req.params.id })

    return res.send()
  },
}
