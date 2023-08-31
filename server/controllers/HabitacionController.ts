import { Request, Response } from "express"
import { getDatabaseConnection } from "../db/conn"

export default class HabitacionController {
	private db

	constructor() {
		this.db = getDatabaseConnection()
		this.createHabitacion = this.createHabitacion.bind(this)
		this.getAllHabitaciones = this.getAllHabitaciones.bind(this)
        this.getHabitacionBy = this.getHabitacionBy.bind(this)
        this.getHabitacionDisponible = this.getHabitacionDisponible.bind(this)
		this.getHabitacion = this.getHabitacion.bind(this)
		this.updateHabitacion = this.updateHabitacion.bind(this)
		this.deleteHabitacion = this.deleteHabitacion.bind(this)
	}

	async createHabitacion(req: Request, res: Response) {
		const { numero, piso, tipo, descripcion, costodia } = req.body

		const habitacion = await this.db.habitacion.create({
			data: {
				numero: Number(numero),
				piso: Number(piso),
				tipo: tipo,
				descripcion: descripcion,
				costodia: Number(costodia),
			},
		})

		res.status(201).json(habitacion)
	}

	async getAllHabitaciones(req: Request, res: Response) {
		const habitaciones = await this.db.habitacion.findMany()
		console.log(habitaciones)
		res.status(200).json(habitaciones)
	}

    async getHabitacionBy(req: Request, res: Response) {
        const { numero, piso, tipo, costodia } = req.query

        const habitaciones = await this.db.habitacion.findMany({
            where: {
                numero: Number(numero) || undefined,
                piso: Number(piso) || undefined,
                tipo: tipo?.toString() || undefined,
                costodia: Number(costodia) || undefined,
            }
        })
        res.status(200).json(habitaciones)
    }

    async getHabitacionDisponible(req: Request, res: Response) {
        const { checkIn, checkOut } = req.query
        const {}


        const habitaciones = await this.db.habitacion.findMany({
            where: {
                NOT: {
                    reserva: {
                        some: {
                            AND: [
                                {
                                    tscheckin: {
                                        lte: checkIn as string
                                    }
                                },
                                {
                                    tscheckout: {
                                        gte: checkOut as string
                                    }
                                }
                            ]
                        }
                    }
                }
            },
            include: {
                reserva: true
            },
        })
        res.status(200).json(habitaciones)
    }

	async getHabitacion(req: Request, res: Response) {
		const { id } = req.params
		const habitacion = await this.db.habitacion.findUnique({
			where: {
				id: Number(id),
			},
		})
		res.status(200).json(habitacion)
	}

	async updateHabitacion(req: Request, res: Response) {
		const { numero, piso, tipo, descripcion, costodia } = req.body
		const { id } = req.params
		const habitacion = await this.db.habitacion.update({
			where: {
				id: Number(id),
			},
			data: {
				numero: Number(numero),
				piso: Number(piso),
				tipo: tipo,
				descripcion: descripcion,
				costodia: Number(costodia),
			},
		})
		res.status(200).json(habitacion)
	}

	async deleteHabitacion(req: Request, res: Response) {
		const { id } = req.params
		const habitacion = await this.db.habitacion.delete({
			where: {
				id: Number(id),
			},
		})
		res.status(204).json(habitacion)
	}
}
