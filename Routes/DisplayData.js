const express = require("express");
const { model } = require("mongoose");
const router = express.Router();



router.post("/foodData",(req,res)=>{
    try {
     res.send([ global.food_item , global.food_catagroy ])
     console.log( global.food_item)
    } catch (error) {
     console.log(error.massage)
    }
   })




   module.exports = router