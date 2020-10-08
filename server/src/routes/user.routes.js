import { Router } from "express"
import UserController from "../controllers/UserController"

const userRouter = Router()

// routes.use(authMiddleware)

userRouter.get("/", UserController.index)
userRouter.get("/:id", UserController.details)
userRouter.post("/", UserController.store)
userRouter.put("/:id", UserController.update)
userRouter.delete("/:id", UserController.destroy)

export default userRouter
