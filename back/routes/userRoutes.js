import express from 'express'
import { authUser } from '../controllers/user/authController.js'
import { getUsersProfile } from '../controllers/user/profileController.js'
import { regUser } from '../controllers/user/regController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/login').post(authUser)
router.route('/profile').get(protect, getUsersProfile)
router.route('/').post(regUser)

export default router
