import express from "express"
import cors from "cors"
import users from "./api/users.route.js"

const app = express()

app.use(cors())
app.use(express.json()) //able to read JSON

app.use("/api/gachashop", users)
app.use("*", (req, res)=> res.status(404).json({error: "not found"})) // error msg if api not found

export default app

