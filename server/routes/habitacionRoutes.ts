const express = require('express')
import HabitacionController  from '../controllers/HabitacionController'
import authenticate from '../middlewares/authentication'
import verifyRole from '../middlewares/roles'

const router = express.Router()
const habitacionController = new HabitacionController()

router.post('/habitacion', authenticate, verifyRole(['admin']), habitacionController.createHabitacion)
router.get('/habitacion', habitacionController.getAllHabitaciones)
router.get('/habitacion/:id', habitacionController.getHabitacion)
router.get('/habitacionBy', habitacionController.getHabitacionBy)
router.get('/habitacionDisponible', habitacionController.getHabitacionDisponible)
router.put('/habitacion/:id', authenticate, verifyRole(['admin']), habitacionController.updateHabitacion)
router.delete('/habitacion/:id', authenticate, verifyRole(['admin']), habitacionController.deleteHabitacion)

module.exports = router;