import User from "../models/User"

export default {
  async getAll(req, res) {
    const response = await User.find()

    return res.json(response);
  },
  
  async getById(req, res) {
    const response = await User.findById(req.params.id)

    return res.json(response)
  },

  async create(req, res) {
    const response = await User.create(req.body)

    return res.json(response)
  },

  async update(req, res) {
    const response = await User.findOneAndUpdate({ _id: req.params.id}, req.body, {
      new: true,
    })

    return res.json(response)
  },

  async delete(req, res) {
    await User.deleteOne({ _id: req.params.id })

    return res.send()
  },
}
