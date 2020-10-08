import repository from "../repositories/UserRepository"

export default {
  async index(req, res) {
    const users = await repository.get()

    return res.json(users)
  },

  async details(req, res) {
    const { id } = req.params

    const user = await repository.getById(id)

    return res.json(user)
  },

  async store(req, res) {
    const { name, email, password } = req.body

    const user = await repository.create({ name, email, password })

    return res.json(user)
  },

  async update(req, res) {
    const { id } = req.params
    const { name, email, password } = req.body

    const user = await repository.update(id, { name, email, password })

    return res.json(user)
  },

  async destroy(req, res) {
    const { id } = req.params

    const user = await repository.delete(id)

    return res.json(user)
  },
}
