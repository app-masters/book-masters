import { Router } from "express"
import BookController from "../controllers/BookController"

const bookRouter = Router()


bookRouter.get("/", BookController.getAll)
bookRouter.get("/:id", BookController.getById)
bookRouter.post("/", BookController.create)
bookRouter.put("/:id", BookController.update)
bookRouter.delete("/:id", BookController.delete)

export default bookRouter