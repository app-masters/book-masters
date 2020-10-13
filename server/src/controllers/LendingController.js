import Lending from "../models/Lending";
import Lending from "../models/Lending"

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
