import { NextFunction, Request, Response } from "express";
import { UserRequest } from "../types";

function verifyRole(allowedRoles: string[]) {
    return (req: UserRequest, res: Response, next: NextFunction) => {
        const { rol } = req.user
        console.log(rol)
        if (allowedRoles.includes(rol)) {
            next();
        } else {
            res.status(403).json({ message: "No tienes permitido hacer eso." });
        }
    }
}

export default verifyRole