import { Request, Response } from "express";
import { getDatabaseConnection } from "../db/conn";

export default class ReservaController {
    private db

    constructor() {
        this.db = getDatabaseConnection()
        this.createReserva = this.createReserva.bind(this)
        this.getAllReservas = this.getAllReservas.bind(this)
        this.getReserva = this.getReserva.bind(this)
        this.updateReserva = this.updateReserva.bind(this)
        this.deleteReserva = this.deleteReserva.bind(this)
    }

    async createReserva(req: Request, res: Response) {
        const { idCliente, idHabitacion, tsCheckIn,nAcompañantes, tsCheckOut } = req.body

        const reserva = await this.db.reserva.create({
            data: {
                idcliente: idCliente,
                idhabitacion: idHabitacion,
                nacompa_antes: nAcompañantes,
                estado: "Confirmada",
                tscreacion: Date.now().toString(),
                tscheckin: tsCheckIn,
                tscheckout: tsCheckOut,
            }
        })

        res.status(201).json(reserva)
    }

    async getAllReservas(req: Request, res: Response) {
        const reservas = await this.db.reserva.findMany()
        console.log(reservas)
        res.status(200).json(reservas)
    }

    async getReserva(req: Request, res: Response) {
        const { id } = req.params
        const reserva = await this.db.reserva.findUnique({
            where: {
                id: Number(id)
            }
        })
        res.status(200).json(reserva)
    }

    async updateReserva(req: Request, res: Response) {
        const { idCliente, idHabitacion, nAcompañantes, estado, tsCheckIn, tsCheckOut, tsCancelación, costoTotal, } = req.body
        const { id } = req.params
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
        })
        res.status(200).json(reserva)
    }

    async deleteReserva(req: Request, res: Response) {
        const { id } = req.params
        await this.db.reserva.update({
            where: {
                id: Number(id)
            },
            data: {
                tscancelacion: Date.now().toString(),
                estado: "Cancelada"
            }
        })
        res.status(204)
    }

}
