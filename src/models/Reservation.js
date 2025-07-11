import { Schema, model } from "mongoose";

/* 
campos:
clientId
vehicle
service
status
*/

const ReservationSchema = new Schema ({
    clientId:{
    type: Schema.Types.ObjectId,
        ref: "Clients",
        require:true
            },
    vehicle: {
        type:String,
        require: true,
        maxLenght:200
    },
    service:{
        type:String,
        require:true,
        maxLenght:350
    },
    status:{
    type:String,
        require:true,
        maxLenght:50
    }

} ,{
    timestamps:true,
    strict:false
})

export default model ("Reservations", ReservationSchema );