
import express from "express";
import ClientsController from "../controllers/ClientsController.js"

const router = express.Router();


router.route("/")
.get(ClientsController.getClients)
.post(ClientsController.insertClients)

router.route("/:id")
.get(ClientsController.getClientById)
.put(ClientsController.updateLocal)
.delete(ClientsController.deleteLocal)

export default router