const express = require('express')
import authenticate from '../middlewares/authentication'
import verifyRole from '../middlewares/roles'
import ReservaController from '../controllers/ReservaController';

const router = express.Router()
const reservaController = new ReservaController()

router.post('/reserva', authenticate, reservaController.createReserva)
router.get('/reserva', reservaController.getAllReservas)
router.get('/reserva/:id', reservaController.getReserva)
router.put('/reserva/:id', authenticate, verifyRole(['admin']), reservaController.updateReserva)
router.delete('/reserva/:id', authenticate, reservaController.deleteReserva)

module.exports = router;