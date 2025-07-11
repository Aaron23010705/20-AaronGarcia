const ReservationController = {};
import Reservation from "../models/Reservation.js";



/*
ClientId
Vehicle
Service
status
*/ 




ReservationController.getReservationById = async (req, res) => {
    try {
        const { id } = req.params;
        
        // Validar que el ID sea un ObjectId válido de MongoDB
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ message: "Invalid ID format" });
        }

        const client = await Reservation.findById(id);
        
        if (!client) {
            return res.status(404).json({ message: "Client not found" });
        }

        res.status(200).json(client);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

ReservationController.getReservations = async (req, res) => {
    try {
        const reservations = await Reservation.find();
        res.status(200).json(reservations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

ReservationController.insertReservation = async (req, res) => {
    try {
        const { name, password, email, phone, age } = req.body;

        // Validar campos requeridos
        if (!name || !password || !email || !phone || !age) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Validar nombre
        if (!validateName(name)) {
            return res.status(400).json({ message: "Name must contain only letters and spaces, and be at least 2 characters long" });
        }
        if (name.length > 100) {
            return res.status(400).json({ message: "Name cannot exceed 100 characters" });
        }

        // Validar email
        if (!validateEmail(email)) {
            return res.status(400).json({ message: "Please provide a valid email address" });
        }
        if (email.length > 100) {
            return res.status(400).json({ message: "Email cannot exceed 100 characters" });
        }

        // Validar password
        if (!validatePassword(password)) {
            return res.status(400).json({ message: "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character" });
        }
        if (password.length > 100) {
            return res.status(400).json({ message: "Password cannot exceed 100 characters" });
        }

        // Validar teléfono
        if (!validatePhone(phone)) {
            return res.status(400).json({ message: "Please provide a valid phone number" });
        }

        // Validar edad
        if (!Number.isInteger(Number(age))) {
            return res.status(400).json({ message: "Age must be a whole number" });
        }
        if (age < 15 || age > 80) {
            return res.status(400).json({ message: "Age must be between 15 and 80 years" });
        }

        // Verificar si el cliente ya existe
        const doesClientExist = await Reservation.findOne({ email: email.toLowerCase() });
        if (doesClientExist) {
            return res.status(400).json({ message: "Client already exists" });
        }

        const newClient = new Reservation({ 
            name: name.trim(), 
            password, 
            email: email.toLowerCase().trim(), 
            phone, 
            age: Number(age) 
        });
        
        await newClient.save();
        res.status(201).json({ message: "Client saved successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

ReservationController.updateReservation = async (req, res) => {
    try {
        const { name, password, email, phone, age } = req.body;

        // Validar campos requeridos
        if (!name || !password || !email || !phone || !age) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Validar nombre
        if (!validateName(name)) {
            return res.status(400).json({ message: "Name must contain only letters and spaces, and be at least 2 characters long" });
        }
        if (name.length > 100) {
            return res.status(400).json({ message: "Name cannot exceed 100 characters" });
        }

        // Validar email
        if (!validateEmail(email)) {
            return res.status(400).json({ message: "Please provide a valid email address" });
        }
        if (email.length > 100) {
            return res.status(400).json({ message: "Email cannot exceed 100 characters" });
        }

        // Validar password
        if (!validatePassword(password)) {
            return res.status(400).json({ message: "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character" });
        }
        if (password.length > 100) {
            return res.status(400).json({ message: "Password cannot exceed 100 characters" });
        }

        // Validar teléfono
        if (!validatePhone(phone)) {
            return res.status(400).json({ message: "Please provide a valid phone number" });
        }

        // Validar edad
        if (!Number.isInteger(Number(age))) {
            return res.status(400).json({ message: "Age must be a whole number" });
        }
        if (age < 15 || age > 80) {
            return res.status(400).json({ message: "Age must be between 15 and 80 years" });
        }

        // Verificar si el cliente existe
        const clientExists = await Reservation.findById(req.params.id);
        if (!clientExists) {
            return res.status(404).json({ message: "Client doesn't exist, can't update" });
        }

        // Verificar si el email ya está siendo usado por otro cliente
        const emailExists = await Reservation.findOne({ 
            email: email.toLowerCase(), 
            _id: { $ne: req.params.id } 
        });
        if (emailExists) {
            return res.status(400).json({ message: "Email is already being used by another client" });
        }

        const updateClient = await Reservation.findByIdAndUpdate(
            req.params.id,
            { 
                name: name.trim(), 
                password, 
                email: email.toLowerCase().trim(), 
                phone, 
                age: Number(age) 
            },
            { new: true }
        );

        res.status(200).json({ message: "Client updated successfully", client: updateClient });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

ReservationController.deleteReservation = async (req, res) => {
    try {
        // Verificar si el cliente existe antes de eliminar
        const clientExists = await Reservation.findById(req.params.id);
        if (!clientExists) {
            return res.status(404).json({ message: "Client not found" });
        }

        await Reservation.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Client deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export default ReservationController;