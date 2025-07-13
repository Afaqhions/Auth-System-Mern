import express from "express"
import { loginUser, SignupUser } from "../Controller/authController.js"

const router = express.Router()

router.get("/",(req,res)=>{
    res.send("Home")
})

// Login user route
router.post("/login",loginUser)

// Sign up user route
router.post("/signup",SignupUser)

export default router;