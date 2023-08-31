const express = require('express')
import ClienteController  from '../controllers/ClienteController'
import authenticate from '../middlewares/authentication'
import verifyRole from '../middlewares/roles'

const router = express.Router()
const clienteController = new ClienteController()

router.post('/cliente', clienteController.createUser, clienteController.login)
router.post('/cliente/login', clienteController.login)
//router.get('/cliente', clienteController.getAllUsers)
// router.get('/cliente/:id', clienteController.getUser)
router.put('/cliente/:id', authenticate ,clienteController.updateUser)
router.delete('/cliente/:id', authenticate, verifyRole(['admin']), clienteController.deleteUser)

module.exports = router;