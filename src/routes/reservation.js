
import express from "express";
import ReservationController from "../controllers/ReservationController"; "../controllers/ReservationController.js"

const router = express.Router();


router.route("/")
.get(ReservationController.getReservations)
.post(ReservationController.insertReservation)

router.route("/:id")
.get(ReservationController.getReservationById)
.put(ReservationController.updateReservation)
.delete(ReservationController.deleteReservation)

export default router