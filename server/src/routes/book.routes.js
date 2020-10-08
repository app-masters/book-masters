import { Router } from "express"
import BookController from "../controllers/BookController"

const bookRouter = Router()

// routes.use(authMiddleware)

bookRouter.get("/", BookController.index)
bookRouter.get("/:id", BookController.details)
bookRouter.post("/", BookController.store)
bookRouter.put("/:id", BookController.update)
bookRouter.delete("/:id", BookController.destroy)

export default bookRouter