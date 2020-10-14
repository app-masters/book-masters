import Lending from "../models/Lending";
import User from "../models/User"

const verifyValidEmail = (email) =>{
  const verification = /\w+\@\w+\.(com|\edu|\org)(\.br)?/;

  if(verification.exec(email))
    return email;
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
  async create(req, res) {
    const response = await Lending.create(req.body)

    return res.json(response)
  },

  async lending(req, res) {
    const lending = await req.body;
    const email = verifyValidEmail(lending.person.email);
    const lendingJson = { 
      id_book:lending.id_book, 
      person: { 
        email: email, 
        name:lending.person.name, 
        phoneNumber:lending.person.phoneNumber
      },
    };
    
    const user = await User.find({ email: lendingJson.person.email});
    
    if(lendingJson.person.email === user[0]?.email){
      return res.json("Okay");
    }

    return res.json("NotOkay");
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
