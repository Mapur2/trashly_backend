const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true
        },
        points: {
            type: Number,
            default: 0
        },
        ewaste: [
            {
                name: String,
                location: String,
                photo:String,
                approved: {
                    type: Boolean,
                    default: false
                },
                rejected: {
                    type: Boolean,
                    default: false
                }
            }
        ]
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model("User", userSchema)