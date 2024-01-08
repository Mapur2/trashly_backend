const {Schema,model } =require('mongoose')

const messageSchema = new Schema({

    message:{
        type:String,
    },
    reply:{
        type:String,
        default:null
    },
    complete:{
        type:Boolean,
        default:false
    },
    createdBy:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }
},
{
    timestamps:true
})

module.exports = model("Message",messageSchema)