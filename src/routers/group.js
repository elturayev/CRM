import { Router } from 'express'
import controller from '../controllers/group.js'

const router = Router()

router.get('/', controller.GET)
router.get('/:active', controller.GET)


export default router;