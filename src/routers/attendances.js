import { Router } from 'express'
import controller from '../controllers/attendances.js'

const router = Router()

router.get('/', controller.GET)
router.post('/', controller.POST)

export default router;