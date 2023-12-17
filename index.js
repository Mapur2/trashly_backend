require('dotenv').config()
const express = require('express');
const app=express()
app.use(express.static('./public'))
const connectdb = require('./db/connectDb')


const cors = require('cors');



app.use(cors({
    methods:"*",
    origin:'*',
    credentials:true
}))
app.use(express.json())
app.use(express.urlencoded({
    extended:false
}))

const router = require('./routers/user.router');
app.use('/api/v1',router)


connectdb()
.then(()=>{
    app.listen(3000,()=>console.log("Server started"))
})
.catch((error)=>{
    console.log(error)
})
