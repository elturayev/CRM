import { Router } from 'express'
import controller from '../controllers/students.js'
import validator from '../middlewares/validation.js'

const router = Router()

router.get('/',controller.GET)
router.get('/:params',controller.GET)
router.post('/',validator.validStudent,controller.POST)
router.delete('/',controller.DELETE)

export default router;