import express from "express"
import usersController from "./users.controller.js"

const router = express.Router()

router.route("/").get((req, res)=> res.send("hello world"))
router.route("/users").get(usersController.apiGetUsers)



export default router