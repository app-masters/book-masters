import Book from "../models/Book"

export default {
  async get() {
    const response = await Book.find()

    return response
  },
  async getById(id) {
    const response = await Book.findById(id)

    return response
  },
  async create(body) {
    const response = await Book.create(body)

    return response
  },
  async update(id, body) {
    const response = await Book.findOneAndUpdate({ _id: id }, body, {
      new: true,
    })

    return response
  },
  async delete(id) {
    const response = await Book.deleteOne({ _id: id })

    return response
  },
}
