import { Router } from "express"
import BookRoute from "./book.routes"
import lendingRouter from './lending.routes';
import userRouter from "./user.routes";

const routes = Router()

routes.use("/", BookRoute);
routes.use("/", lendingRouter);
routes.use("/", userRouter);



export default routes
