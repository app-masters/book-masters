import { Router } from "express"
import UserRoute from "./user.routes"

const routes = Router()

routes.use("/users", UserRoute)

export default routes
