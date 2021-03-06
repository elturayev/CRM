import { Router } from 'express'
import controller from '../controllers/payments.js'

const router = Router()
router.get('/', controller.GET)
router.put('/', controller.PUT)

export default router;