const mongoose = require('mongoose');

const connectdb=async()=>{
    try {
        const cI = await mongoose.connect(`${process.env.MONGO_URI}trashly`)
        console.log(cI.connection.host)
    } catch (error) {
        console.log("Failed to connect DB ", error)
    }
}

module.exports = connectdb