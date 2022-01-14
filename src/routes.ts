import { Router } from 'express'
const router = Router()

import jwtmodule from './modules/jwt'
import verifyAdministrator from './modules/verifyAdministrator'

// import controllers
import UserController from './controllers/UserController'

router.post('/user/create', UserController.create)
router.post('/user/login', UserController.login)
router.post('/user/list', jwtmodule.verifyToken, verifyAdministrator, UserController.list)
router.post('/user/update', jwtmodule.verifyToken, UserController.update)
router.post('/user/delete', jwtmodule.verifyToken, UserController.delete)

export default router
