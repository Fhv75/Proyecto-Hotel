const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const path = require('path')
const userRouter = require('./routes/clienteRoutes')
const habitacionRouter = require('./routes/habitacionRoutes')
const reservaRouter = require('./routes/reservaRoutes')

const app = express()

dotenv.config({path: path.resolve(__dirname, '../.env') })
const PORT = process.env.PORT || 5000

app.use(cors({ origin: 'http://localhost:5173' }))
app.use(express.json())
app.use(userRouter, habitacionRouter, reservaRouter)

app.listen(PORT, () => {
    console.log(`app is running on port ${PORT}`)
    }
)