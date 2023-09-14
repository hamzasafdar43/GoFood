const express = require("express")
const app = express()
const   PORT = 8000
const User = require("./Model/userSchema")
const mongoose = require("mongoose")
const cors = require("cors")
const mngoDB = require("./db")
const router = require("./Routes/registereduser")
const routes = require("./Routes/DisplayData")
const routed = require("./Routes/userOrderData")



app.use(express.json())

// db folder to call mngDB function in index page//
mngoDB()

// use cors page to fetch data in frontend.......//
app.use(cors())
app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin" , "http://localhost:3000");
    res.header(
    "Access-Control-Allow-Header",
    "Origin, X-Requsted-With , Content-Type ,Accept"
    );
    next()
});


app.get("/" ,(req,res)=>{
    res.send("hello world and welcome to my node js project")
})

// static file access 
app.use(express.static(path.join(__dirname, "./gofood/build")));

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "./gofood/build/index.html"));
  });


app.use("/" , router)
app.use("/" , routes)
app.use("/" , routed)

app.listen(PORT ,()=>{
    console.log("port connected")
})