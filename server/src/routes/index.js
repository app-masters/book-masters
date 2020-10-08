import { Router } from "express"
import BookRoute from "./book.routes"

const routes = Router()

routes.use("/", BookRoute)

export default routes
