import { Router } from 'express'
import controller from '../controllers/auth.js'
import validator from '../middlewares/validation.js'

const router = Router()

router.post('/login',validator.validLogin,controller.LOGIN)
// router.post('/register',controller.REGISTER)


export default router;