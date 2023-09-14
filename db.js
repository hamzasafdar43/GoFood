const mongoose = require("mongoose")

const mongodb = "mongodb://127.0.0.1:27017/goFoodmern"

const mngoDB = () =>{
    mongoose.connect(mongodb,{useNewUrlParser:true},async(err,result)=>{
        if(err) console.log(err)
        else{
            console.log("conncetd")
        }

        const fetch_data =await mongoose.connection.db.collection("foodItems")
        fetch_data.find({}).toArray( async function(err , food){
        const foodCatagroy =await mongoose.connection.db.collection("foodCatagroy")
       foodCatagroy.find({}).toArray(function(err , foodCat){
            if(err){
            console.log("server error issue")
            }
            else{
                global.food_item = food
                global.food_catagroy = foodCat
          
            }
        })
        })
    })
   
}
module.exports= mngoDB;