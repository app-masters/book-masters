import { Router } from "express"
import LendingController from "../controllers/LendingController"

const lendingRouter = Router()


lendingRouter.get("/lendings/", LendingController.getAll)
lendingRouter.get("/lendings/:id", LendingController.getById)
lendingRouter.put("/lendings/:id", LendingController.update)
lendingRouter.delete("/lendings/:id", LendingController.delete)
lendingRouter.post("/lending/", LendingController.lending)




export default lendingRouter