import { Router } from "express"
import { registerUser, loginUser } from "../controllers/user.controller.js"
import { commonUserValidations, validateRegister } from "../middlwares/validation.middleware.js"

const router = Router()

router.route("/register").post(commonUserValidations, validateRegister, registerUser)
router.route("/login").post(commonUserValidations,loginUser)

export default router