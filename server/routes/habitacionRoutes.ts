const express = require('express')
import HabitacionController  from '../controllers/HabitacionController'
import authenticate from '../middlewares/authentication'
import verifyRole from '../middlewares/roles'

const router = express.Router()
const habitacionController = new HabitacionController()

router.post('/habitacion', authenticate, verifyRole(['admin']), habitacionController.createHabitacion)
router.get('/habitacion', authenticate, habitacionController.getAllHabitaciones)
router.get('/popularHabitaciones', authenticate, habitacionController.getPopularHabitaciones)
router.get('/habitacion/:id', authenticate, habitacionController.getHabitacion)
router.get('/habitacionesBy', authenticate, habitacionController.getHabitacionesBy)
router.put('/habitacion/:id', authenticate, verifyRole(['admin']), habitacionController.updateHabitacion)
router.delete('/habitacion/:id', authenticate, verifyRole(['admin']), habitacionController.deleteHabitacion)

module.exports = router;