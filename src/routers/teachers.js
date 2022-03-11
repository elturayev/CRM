import { Router } from 'express'
import controller from '../controllers/teachers.js'
import validator from '../middlewares/validation.js'

const router = Router()

router.get('/', controller.GET)
router.post('/', validator.validTeacher, controller.POST)
router.delete('/', controller.DELETE)

export default router;