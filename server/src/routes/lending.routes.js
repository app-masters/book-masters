import { Router } from "express"
import LendingController from "../controllers/LendingController.js"

const lendingRouter = Router()


lendingRouter.get("/lendings/", LendingController.getAll)
lendingRouter.get("/lendings/book/:id", LendingController.getAllBookLending)
lendingRouter.get("/lendings/:id", LendingController.getById)
lendingRouter.put("/lendings/:id", LendingController.update)
lendingRouter.delete("/lendings/:id", LendingController.delete)
lendingRouter.post("/lendings/", LendingController.lending)
lendingRouter.post("/lendings/reserve", LendingController.reserve)
lendingRouter.post("/lendings/return", LendingController.returnBook)





export default lendingRouter