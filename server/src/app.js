import express from "express"
import cors from "cors"
import routes from "./routes/index.js"

import "dotenv/config.js"
import  "./database/connection.js"

const app = express()
app.use(cors())
app.use(express.json())
app.use(routes)

export default app
