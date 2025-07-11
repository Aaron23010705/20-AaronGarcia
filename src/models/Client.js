
import { Schema, model  } from "mongoose"; 
/* name
email
password
phone
age
*/
const clientsSchema = new Schema(
    { name: {
type:String,
 require:true,
 maxLength:100
},
email:{
type:String,
require:true,
maxLenght:100
},
password:{
    type:String,
     require:true,
     maxLenght:100
},
phone:{
type:String,
require:true,
maxLenght:10
},
age:{
type:Number,
require:true,
min:15,
max:80
},
 }, 
{
timestamps:true,
strict:true
})

export default model ("Clients", clientsSchema );