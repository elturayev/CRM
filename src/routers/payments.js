import { Router } from 'express'
import controller from '../controllers/payments.js'

const router = Router()
router.get('/', controller.GET)
router.post('/', controller.POST)

export default router;