const mongoose = require('mongoose');

const ewasteSchema = new mongoose.Schema({
    name: String,
    location: String,
    photo: String,
    approved: {
        type: Boolean,
        default: false
    },
    rejected: {
        type: Boolean,
        default: false
    },
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
    }
},
    { timestamps: true }
)

module.exports = mongoose.model("Ewaste",ewasteSchema)

