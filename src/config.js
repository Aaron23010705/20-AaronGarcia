import dotenv from "dotenv"

//Ejecutamos la libreria dotenv para acceder al .env
dotenv.config();  

//Con esta función accedemos a l

export const config = {
    db:{
        URI: process.env.DB_URI,
    },
    server:{
        port: process.env.PORT
    }
};