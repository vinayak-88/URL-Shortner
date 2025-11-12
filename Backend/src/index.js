require("dotenv").config();
const express = require("express")
const {connectDB} = require('./config/database')

const app = express()
app.listen(3000, ()=>{

    console.log("server started");
})