const ReservationController = {};
import Reservation from "../models/Reservation.js";

/*
clientId
vehicle
service
status
*/ 

ReservationController.getReservationById = async (req, res) => {
    try {
        const { id } = req.params;
        
        // Validar que el ID sea un ObjectId válido de MongoDB
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ message: "Invalid ID format" });
        }

        const reservation = await Reservation.findById(id).populate('clientId');
        
        if (!reservation) {
            return res.status(404).json({ message: "Reservation not found" });
        }

        res.status(200).json(reservation);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

ReservationController.getReservations = async (req, res) => {
    try {
        const reservations = await Reservation.find().populate('clientId');
        res.status(200).json(reservations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

ReservationController.insertReservation = async (req, res) => {
    try {
        const { clientId, vehicle, service, status } = req.body;

        // Validar campos requeridos
        if (!clientId || !vehicle || !service || !status) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Validar clientId formato ObjectId
        if (!clientId.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ message: "Invalid clientId format" });
        }

        // Validar vehicle
        if (typeof vehicle !== 'string' || vehicle.trim().length === 0) {
            return res.status(400).json({ message: "Vehicle must be a valid string" });
        }
        if (vehicle.length > 200) {
            return res.status(400).json({ message: "Vehicle cannot exceed 200 characters" });
        }

        // Validar service
        if (typeof service !== 'string' || service.trim().length === 0) {
            return res.status(400).json({ message: "Service must be a valid string" });
        }
        if (service.length > 350) {
            return res.status(400).json({ message: "Service cannot exceed 350 characters" });
        }

        // Validar status
        if (typeof status !== 'string' || status.trim().length === 0) {
            return res.status(400).json({ message: "Status must be a valid string" });
        }
        if (status.length > 50) {
            return res.status(400).json({ message: "Status cannot exceed 50 characters" });
        }

        // Validar valores permitidos para status
        const validStatuses = ['pending', 'confirmed', 'in-progress', 'completed', 'cancelled'];
        if (!validStatuses.includes(status.toLowerCase())) {
            return res.status(400).json({ 
                message: `Status must be one of: ${validStatuses.join(', ')}` 
            });
        }

        const newReservation = new Reservation({ 
            clientId: clientId.trim(),
            vehicle: vehicle.trim(),
            service: service.trim(),
            status: status.toLowerCase().trim()
        });
        
        await newReservation.save();
        res.status(201).json({ message: "Reservation saved successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

ReservationController.updateReservation = async (req, res) => {
    try {
        const { clientId, vehicle, service, status } = req.body;

        // Validar campos requeridos
        if (!clientId || !vehicle || !service || !status) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Validar clientId formato ObjectId
        if (!clientId.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ message: "Invalid clientId format" });
        }

        // Validar vehicle
        if (typeof vehicle !== 'string' || vehicle.trim().length === 0) {
            return res.status(400).json({ message: "Vehicle must be a valid string" });
        }
        if (vehicle.length > 200) {
            return res.status(400).json({ message: "Vehicle cannot exceed 200 characters" });
        }

        // Validar service
        if (typeof service !== 'string' || service.trim().length === 0) {
            return res.status(400).json({ message: "Service must be a valid string" });
        }
        if (service.length > 350) {
            return res.status(400).json({ message: "Service cannot exceed 350 characters" });
        }

        // Validar status
        if (typeof status !== 'string' || status.trim().length === 0) {
            return res.status(400).json({ message: "Status must be a valid string" });
        }
        if (status.length > 50) {
            return res.status(400).json({ message: "Status cannot exceed 50 characters" });
        }

        // Validar valores permitidos para status
        const validStatuses = ['pending', 'confirmed', 'in-progress', 'completed', 'cancelled'];
        if (!validStatuses.includes(status.toLowerCase())) {
            return res.status(400).json({ 
                message: `Status must be one of: ${validStatuses.join(', ')}` 
            });
        }

        // Verificar si la reservación existe
        const reservationExists = await Reservation.findById(req.params.id);
        if (!reservationExists) {
            return res.status(404).json({ message: "Reservation doesn't exist, can't update" });
        }

        const updateReservation = await Reservation.findByIdAndUpdate(
            req.params.id,
            { 
                clientId: clientId.trim(),
                vehicle: vehicle.trim(),
                service: service.trim(),
                status: status.toLowerCase().trim()
            },
            { new: true }
        ).populate('clientId');

        res.status(200).json({ 
            message: "Reservation updated successfully", 
            reservation: updateReservation 
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

ReservationController.deleteReservation = async (req, res) => {
    try {
        // Verificar si la reservación existe antes de eliminar
        const reservationExists = await Reservation.findById(req.params.id);
        if (!reservationExists) {
            return res.status(404).json({ message: "Reservation not found" });
        }

        await Reservation.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Reservation deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export default ReservationController;