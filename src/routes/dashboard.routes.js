import { Router } from "express"
import { getDashboard } from "../controllers/dashboard.controller.js"
import auth from "../middlewares/auth.js"

const router = Router()

router.get("/dashboard", auth, getDashboard)

export default router
