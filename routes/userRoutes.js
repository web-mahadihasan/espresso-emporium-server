const express = require("express")
const { createNewUser, getAllUser } = require("../controllers/usersController")

const userRouter = express.Router()

userRouter.get("/", getAllUser)
userRouter.post("/", createNewUser)


module.exports = userRouter;