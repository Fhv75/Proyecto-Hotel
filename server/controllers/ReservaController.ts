import { Request, Response } from "express";
import { getDatabaseConnection } from "../db/conn";
import { UserRequest } from "../types";

export default class ReservaController {
    private db;

    constructor() {
        this.db = getDatabaseConnection();
        this.createReserva = this.createReserva.bind(this);
        this.getAllReservas = this.getAllReservas.bind(this);
        this.getReserva = this.getReserva.bind(this);
        this.getUserReservas = this.getUserReservas.bind(this);
        this.updateReserva = this.updateReserva.bind(this);
        this.deleteReserva = this.deleteReserva.bind(this);
    }

    async createReserva(req: Request, res: Response) {
        try {
            const { idCliente, idHabitacion, tsCheckIn, nAcompañantes, tsCheckOut } = req.body;
    
            const reserva = await this.db.reserva.create({
                data: {
                    idcliente: idCliente,
                    idhabitacion: idHabitacion,
                    nacompa_antes: nAcompañantes,
                    estado: "Confirmada",
                    tscreacion: new Date(Date.now()).toISOString(),
                    tscheckin: tsCheckIn + new Date(Date.now()).toISOString().substr(10, 14),
                    tscheckout: tsCheckOut + new Date(Date.now()).toISOString().substr(10, 14),
                }
            });

            res.status(201).json(reserva);
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: "Error al crear reserva", error });
        }
    }

    async getAllReservas(req: Request, res: Response) {
        try {
            const reservas = await this.db.reserva.findMany();

            res.status(200).json(reservas);
        } catch (error) {
            res.status(500).json({ message: "Error al obtener reservas", error });
        }
    }

    async getReserva(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const reserva = await this.db.reserva.findUnique({
                where: {
                    id: Number(id)
                }
            });
            if (!reserva) {
                return res.status(404).json({ message: "Reserva no encontrada" });
            }
            res.status(200).json(reserva);
        } catch (error) {
            res.status(500).json({ message: "Error al obtener reserva", error });
        }
    }

    async getUserReservas(req: UserRequest, res: Response) {
        try {
            const email = res.locals.user.email;
            const reservas = await this.db.reserva.findMany({
                where: {
                    cliente: {
                        email: email
                    }
                }
            });
            if (!reservas) {
                return res.status(404).json({ message: "Usuario no tiene reservas" });
            }
            res.status(200).json(reservas);
            
        } catch (error) {
            console.log("adios")
            console.log(error)
            res.status(500).json({ message: "Error al obtener reservas de usuario", error });
        }
    }

    async updateReserva(req: Request, res: Response) {
        try {
            const { idCliente, idHabitacion, nAcompañantes, estado, tsCheckIn, tsCheckOut, tsCancelación, costoTotal } = req.body;
            const { id } = req.params;
            const reserva = await this.db.reserva.update({
                where: {
                    id: Number(id)
                },
                data: {
                    idcliente: idCliente,
                    idhabitacion: idHabitacion,
                    nacompa_antes: Number(nAcompañantes),
                    estado: estado,
                    tscheckin: tsCheckIn,
                    tscheckout: tsCheckOut,
                    tscancelacion: tsCancelación,
                    costototal: Number(costoTotal)
                }
            });
            res.status(200).json(reserva);
        } catch (error) {
            res.status(500).json({ message: "Error al actualizar reserva", error });
        }
    }

    async deleteReserva(req: Request, res: Response) {
        try {
            const { id } = req.params;
            await this.db.reserva.update({
                where: {
                    id: Number(id)
                },
                data: {
                    tscancelacion: new Date(Date.now()).toISOString(),
                    estado: "Cancelada"
                }
            });
            res.status(204).send();
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: "Error al cancelar reserva", error });
        }
    }
}
