import User from "../models/User"

export default {
  async get() {
    const response = await User.find()

    return response
  },
  async getById(id) {
    const response = await User.findById(id)

    return response
  },
  async create(body) {
    const response = await User.create(body)

    return response
  },
  async update(id, body) {
    const response = await User.findOneAndUpdate({ _id: id }, body, {
      new: true,
    })

    return response
  },
  async delete(id) {
    const response = await User.deleteOne({ _id: id })

    return response
  },
}
