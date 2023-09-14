const express = require("express")
const router = express.Router()
const Order = require("../Model/oderData")


router.post("/orderData" ,async(req,res)=>{
    let data = req.body.order_data
    await data.splice(0,0,{Order_date:req.body.order_date})

    let eId = await Order.findOne({'email':req.body.email})
    if(eId === null){
        try {
            await Order.create({
                email:req.body.email,
                order_data:[data]
            }).then(()=>{
                res.json({success:true})
            })
            
        } catch (error) {
            res.status(400).send(error)
            console.log("server error")
        }
    }
    else{
        try {
            await Order.findOneAndUpdate({email:req.body.email} ,{$push:{order_data:data}}).then(()=>{
                res.json({success:true})
            })

        } catch (error) {
            res.status(400).send(error)
            console.log("server error") 
        }
    }
})



router.post('/myOrderData', async (req, res) => {
    try {
       
        let eId = await Order.findOne({ 'email': req.body.email })
        res.json({orderData:eId})
        
    } catch (error) {
        res.send("Error",error.message)
    }
    

});




module.exports = router