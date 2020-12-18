import { Router } from "express"
import BookController from "../controllers/BookController.js"

const bookRouter = Router()


bookRouter.get("/books/", BookController.getAll)
bookRouter.get("/books/:id", BookController.getById)
bookRouter.post("/books/", BookController.create)
bookRouter.put("/books/:id", BookController.update)
bookRouter.delete("/books/:id", BookController.delete)

export default bookRouter