import { Request, Response } from "express";
import { getDatabaseConnection } from "../db/conn";

export default class HabitacionController {
	private db;

	constructor() {
		this.db = getDatabaseConnection();
		this.createHabitacion = this.createHabitacion.bind(this);
		this.getAllHabitaciones = this.getAllHabitaciones.bind(this);
		this.getHabitacionesBy = this.getHabitacionesBy.bind(this);
		this.getHabitacion = this.getHabitacion.bind(this);
		this.updateHabitacion = this.updateHabitacion.bind(this);
		this.deleteHabitacion = this.deleteHabitacion.bind(this);
		this.getPopularHabitaciones = this.getPopularHabitaciones.bind(this);
	}

	async createHabitacion(req: Request, res: Response) {
		try {
			const { numero, piso, tipo, descripcion, costodia } = req.body;

			const habitacion = await this.db.habitacion.create({
				data: {
					numero: Number(numero),
					piso: Number(piso),
					tipo: tipo,
					descripcion: descripcion,
					costodia: Number(costodia),
				},
			});

			res.status(201).json(habitacion);
		} catch (error) {
			res.status(500).json({
				message: "Error al crear habitación",
				error,
			});
		}
	}

	async getAllHabitaciones(req: Request, res: Response) {
		try {
			const habitaciones = await this.db.habitacion.findMany();
			res.status(200).json(habitaciones);
		} catch (error) {
			res.status(500).json({
				message: "Error al obtener habitaciones",
				error,
			});
		}
	}

	async getPopularHabitaciones(req: Request, res: Response) {
		try {
			const habitacionesConReservas = await this.db.habitacion.findMany({
				select: {
					id: true,
					numero: true,
					piso: true,
					tipo: true,
					descripcion: true,
					costodia: true,
					reserva: {
						select: {
							id: true,
						},
					},
				},
			});
			const habitacionesOrdenadas = habitacionesConReservas.sort(
				(a: any, b: any) => b.reserva.length - a.reserva.length
			);

			console.log(habitacionesOrdenadas)

			res.status(200).json(habitacionesConReservas);
		} catch (error) {
            console.log(error)
			res.status(500).json({
				message: "Error al obtener habitaciones",
				error,
			});
		}
	}

	async getHabitacionesBy(req: Request, res: Response) {
		try {
			let { numero, piso, tipo, costodia, checkIn, checkOut } = req.query;
			const checkInDate = Date.parse(checkIn as string) || "";
			const checkOutDate = Date.parse(checkOut as string) || "";

			const habitaciones = await this.db.habitacion.findMany({
				where: {
					numero: Number(numero) || undefined,
					piso: Number(piso) || undefined,
					tipo: tipo?.toString() || undefined,
					costodia: {
						lte: Number(costodia?.toString().slice(1)) || undefined,
					},
					NOT: {
						reserva: {
							some: {
								AND: [
									{
										tscheckin: {
											lte:
												new Date(checkInDate) ||
												undefined,
										},
									},
									{
										tscheckout: {
											gte:
												new Date(checkOutDate) ||
												undefined,
										},
									},
								],
							},
						},
					},
				},
				include: {
					reserva: true,
				},
			});
			res.status(200).json(habitaciones);
		} catch (error: any) {
			console.log(error.message);
			res.status(500).json({
				message: "Error al obtener habitaciones por criterio",
				error,
			});
		}
	}

	async getHabitacion(req: Request, res: Response) {
		try {
			const { id } = req.params;
			const habitacion = await this.db.habitacion.findUnique({
				where: {
					id: Number(id),
				},
			});
			if (!habitacion) {
				return res
					.status(404)
					.json({ message: "Habitación no encontrada" });
			}
			res.status(200).json(habitacion);
		} catch (error) {
			res.status(500).json({
				message: "Error al obtener habitación",
				error,
			});
		}
	}

	async updateHabitacion(req: Request, res: Response) {
		try {
			const { numero, piso, tipo, descripcion, costodia } = req.body;
			const { id } = req.params;
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
			});
			res.status(200).json(habitacion);
		} catch (error) {
			res.status(500).json({
				message: "Error al actualizar habitación",
				error,
			});
		}
	}

	async deleteHabitacion(req: Request, res: Response) {
		try {
			const { id } = req.params;
			const habitacion = await this.db.habitacion.delete({
				where: {
					id: Number(id),
				},
			});
			res.status(204).json(habitacion);
		} catch (error) {
			res.status(500).json({
				message: "Error al eliminar habitación",
				error,
			});
		}
	}
}
