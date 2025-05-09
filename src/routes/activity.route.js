import { Router } from "express"
import { bookAnActivity, getBookedActivites, listAllActivities } from "../controllers/activity.controller.js"
import { authenticate } from "../middlwares/auth.middleware.js"
import { validateBooking } from "../middlwares/validation.middleware.js"

const router = Router()

router.route("/allactivities").get(listAllActivities)
router.route("/book").post(validateBooking, authenticate, bookAnActivity)
router.route("/mybookings").get(authenticate, getBookedActivites)

export default router