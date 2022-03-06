import { Router } from 'express'
import controller from '../controllers/teachers.js'

const router = Router()

router.get('/', controller.GET)
router.post('/', controller.POST)
router.delete('/', controller.DELETE)

export default router;