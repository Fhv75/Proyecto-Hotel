import { Request, Response } from "express"
import { getDatabaseConnection } from '../db/conn'
import UserResponseData from '../dto/UserResponseData'
import { UserRequest } from "../types"
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

export default class UserController {
    private db

    constructor() {
        this.db = getDatabaseConnection()
        this.createUser = this.createUser.bind(this)
        this.login = this.login.bind(this)
        this.updateUser = this.updateUser.bind(this)
        this.deleteUser = this.deleteUser.bind(this)
    }

    async createUser(req: Request, res: Response) {
        try {
            const { email, nombre, pass, telefono } = req.body

            if (!email || !nombre || !pass || !telefono) {
                return res.status(400).json({ message: 'Datos incompletos' })
            }

            const hashedPw = await bcrypt.hash(pass, 10)

            const user = await this.db.cliente.create({
                data: {
                    email: email,
                    nombre: nombre,
                    pass: hashedPw,
                    telefono: telefono,
                    rol: 'user'
                },
                select: UserResponseData
            })

            res.status(201).json(user)
        } catch (error: any) {
            res.status(500).json({ message: 'Error al crear el usuario', error: error.message })
        }
    }

    async login(req: Request, res: Response) {
        try {
            const { email, pass } = req.body

            const user = await this.db.cliente.findUnique({
                where: {
                    email: email
                },
            })

            const validPw = await bcrypt.compare(pass, user?.pass)

            if (validPw) {
                const token = jwt.sign({
                        email: user?.email,
                        userId: user?.id,
                        rol: user?.rol
                    },
                    process.env.JWT_KEY!,
                    { expiresIn: '1h' }
                )
                return res.status(201).json({ token, userId: user?.id })
            } else {
                return res.status(401).json({
                    message: 'Falló la autenticación'
                })
            }
        } catch (error: any) {
            
            res.status(500).json({ message: 'Error al iniciar sesión', error: error.message })
        }
    }

    async updateUser(req: UserRequest, res: Response) {
        try {
            const { email, pass, nombre, telefono } = req.body
            const { id } = req.params

            const user = await this.db.cliente.update({
                where: {
                    id: Number(id) || undefined,
                    email: req.user.email || undefined
                },
                data: {
                    email: email,
                    pass: pass,
                    nombre: nombre,
                    telefono: telefono
                },
                select: UserResponseData
            })

            res.status(200).json(user)
        } catch (error: any) {
            res.status(500).json({ message: 'Error al actualizar el usuario', error: error.message })
        }
    }

    async deleteUser(req: Request, res: Response) {
        try {
            const { id } = req.params

            await this.db.cliente.delete({
                where: {
                    id: Number(id)
                }
            })

            res.status(204).json()
        } catch (error: any) {
            res.status(500).json({ message: 'Error al eliminar el usuario', error: error.message })
        }
    }
}