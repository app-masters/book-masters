import Book from '../models/Book';
import Lending from '../models/Lending';
import User from '../models/User';
import addDaysToDate from '../utils/addDaysToDate';
import preprocessEmail from '../utils/preprocessEmail';



const findOrCreateUser = async (name, email, phone) => {

  const user = await User.find({ email });
  if (user.length > 0) {
    //console.log(user[0]._id);
    return user[0]._id;
  } else {
    const userJson = {
      email: email,
      name: name,
      phoneNumber: phone,
    };

    let newUser = await User.create(userJson);
    //let responseUser = res.json(newUser);
    //console.log(responseUser._id);
    return newUser._id;
  }

}

export default {
	async getAll(req, res) {
		const response = await Lending.find();
		return res.json(response);
	},

	async getById(req, res) {
		const response = await Lending.findById(req.params.id);
		return res.json(response);
	},

	async lending(req, res) {
    const lending = await req.body;
    
    const {name, email, phone} = lending.person

    /* Check if book is really available for lending */
    const existingLending = await Lending.find({idBook: lending.id_book, status: {$ne: 'Devolvido'}}, (err, results )=> {
      if(err)  return res.status(500).send('Erro de servidor')
      if(results.length != 0) return res.status(406).send('Livro já emprestado')
    })
    

    const procEmail = preprocessEmail(email);
    if (!procEmail) 
      return res.status(406).send('Email inválido')


    /* Find or Create User */
    const idUser = await findOrCreateUser(name, procEmail, phone)

    /* TODO: data do cliente ou no servidor */
    const date = new Date();
		const lendingJson = {
			idBook: lending.id_book,
      idUser: idUser,
      lendingDateInit: date,
      lendingDateFinally: addDaysToDate(date, 28)
		};

    const book = await Book.findOneAndUpdate({_id: lending.id_book }, {status: 'Emprestado'});

		const response = await Lending.create(lendingJson);

		return res.json(response).send();
  },

	async update(req, res) {
		const response = await Lending.findOneAndUpdate({ _id: req.params.id }, req.body, {
			new: true,
		});
		return res.json(response);
	},

	async delete(req, res) {
		await Lending.deleteOne({ _id: req.params.id });
		return res.send();
	},
};
