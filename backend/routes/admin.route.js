import express from 'express'
import { Login, Logout } from "../controllers/admin.controller.js"
const router = express.Router();

router.route('/login').post(Login)
router.route('/logout').get(Logout)

export default router;