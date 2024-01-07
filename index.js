require('dotenv').config()
const express = require('express');
const app=express()
app.use(express.static('./public'))
const connectdb = require('./db/connectDb')


const cors = require('cors');

app.use(express.json())
app.use(express.urlencoded({
    extended:false
}))


app.use(cors({
    methods:"*",
    origin:'*',
    credentials:true
}))


const router = require('./routers/user.router');
app.use('/api/v1',router)

const message=require('./routers/message.router')
app.use('/api/v1',message)


connectdb()
.then(()=>{
    app.listen(3000,()=>console.log("Server started at http://localhost:3000/admin/admin.html"))
})
.catch((error)=>{
    console.log(error)
})
