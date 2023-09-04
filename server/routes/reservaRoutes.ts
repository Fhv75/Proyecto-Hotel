const express = require('express')
import authenticate from '../middlewares/authentication'
import verifyRole from '../middlewares/roles'
import ReservaController from '../controllers/ReservaController';

const router = express.Router()
const reservaController = new ReservaController()

router.post('/reservas', authenticate, reservaController.createReserva)
router.get('/reservas', reservaController.getAllReservas)
router.get('/reservas/:id', reservaController.getReserva)
router.get('/myreservas', authenticate, reservaController.getUserReservas)
router.put('/reservas/:id', authenticate, verifyRole(['admin']), reservaController.updateReserva)
router.delete('/reservas/:id', authenticate, reservaController.deleteReserva)

module.exports = router;