import { NextFunction, Request, Response } from "express"
import { UserRequest } from "../types"

const jwt = require('jsonwebtoken')

// Función que permite o bloquea al acceso a un recurso
// dependiendo de si es que el usuario está autenticado o no

function authenticate(req: UserRequest, res: Response, next: NextFunction) {
    const token = req.header('Authorization')
    if (token) {
        jwt.verify(token, process.env.JWT_KEY, (err: any, decodedToken: any) => {
            if (err) {
                res.status(401).json({ message: "Token Inválido" })
            } else {
                req.user = {
                    email: decodedToken.email,
                    rol: decodedToken.rol
                }
                next()
            }
        })
    } else {
        res.status(401).json({ message: "Acceso Denegado." })
    }
}

export default authenticate