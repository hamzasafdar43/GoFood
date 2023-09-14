const mongoose = require("mongoose")

const {Schema}=mongoose

const orderSchema = new Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    order_data:{
        type:Array,
        requireds:true
    }
})


const Order = mongoose.model("order" , orderSchema)
module.exports = Order