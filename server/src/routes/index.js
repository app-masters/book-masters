import { Router } from "express"
import UserRoute from "./user.routes"

const routes = Router()

routes.use("/", UserRoute)

export default routes
