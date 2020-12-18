import Book from "../models/Book.js"

export default {
  
  async getAll(req, res) {
    const response = await Book.find()

    return res.json(response);
  },

  async getById(req, res) {
    const response = await Book.findById(req.params.id)

    return res.json(response)
  },

  async create(req, res) {
    const response = await Book.create(req.body)

    return res.json(response)
  },

  async update(req, res) {
    const response = await Book.findOneAndUpdate({ _id: req.params.id}, req.body, {
      new: true,
    })

    return res.json(response)
  },

  async delete(req, res) {
    await Book.deleteOne({ _id: req.params.id })

    return res.send()
  },

}
