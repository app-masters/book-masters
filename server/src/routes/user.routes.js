import { Router } from "express"
import userController from "../controllers/UserController.js"

const userRouter = Router() 


userRouter.get("/users/", userController.getAll)
userRouter.get("/users/:id", userController.getById)
userRouter.post("/users/", userController.create)
userRouter.put("/users/:id", userController.update)
userRouter.delete("/users/:id", userController.delete)


export default userRouter