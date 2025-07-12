//Importo toda la libreria de express
import express from "express";
import ClientsRoutes from "./src/routes/clients.js"
import ReservationRoutes from "./src/routes/reservation.js"
import swaggerUi from "swagger-ui-express";
import fs from "fs";
import path from "path";
 

const app = express();

  //Uso un mmiddleware para que acepte datos jason
app.use (express.json());
//Emboids, asi se llaman estas rutas
app.use("/api/clients", ClientsRoutes)
app.use("/api/reservation", ReservationRoutes)


const swaggerDocument = JSON.parse(
  fs.readFileSync(path.resolve("./docu.json"), "utf-8")
);

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
//Exporto la constante para poder usar express en otros lados
export default app;    

