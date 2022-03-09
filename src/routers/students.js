import { Router } from 'express'
import controller from '../controllers/students.js'

const router = Router()

router.get('/',controller.GET)
router.get('/:deletedStudents',controller.GET)
router.post('/',controller.POST)
router.delete('/',controller.DELETE)

export default router;