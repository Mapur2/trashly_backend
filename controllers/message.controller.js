const Message = require('../models/message.model');

const message = async (req, res) => {
    const { userid, message } = req.body

    try {
        const userMessage = await Message.create({
            message,
            createdBy: userid
        })
        return res.status(200).json({
            success: true,
            message: "message created",
            userMessage
        })
    } catch (error) {
        console.log(error)
        return res.status(403).json(
            {
                success: false,
                message: "Something went wrong"
            }
        )
    }
}

const reply = async (req, res) => {
    const { reply, userid } = req.body

    try {
        const userReply = await Message.findOneAndUpdate({ createdBy: userid },
            {
                $set: {
                    "reply": reply,
                    "complete":true
                }
            }, { new: true })

        if (!userReply)
            return res.status(403).json(
                {
                    success: false,
                    message: "Could Not Reply"
                }
            )

        return res.status(200).json({
            success: true,
            message: "replied to message",
            userReply
        })
    }
    catch (error) {
        console.log(error)
        return res.status(403).json(
            {
                success: false,
                message: "Something went wrong"
            }
        )
    }
}

const getAllMessages = async (req, res) => {
    try 
    {
        const messages= await Message.find()
        return res.status(200).json({
            success: true,
            messages
        })
    } 
    catch (error) {
        console.log(error)
        return res.status(403).json(
            {
                success: false,
                message: "Something went wrong"
            }
        )
    }
}

const getUserMessage = async (req, res) =>{
    const {userid} = req.body
     try 
     {
        const messages = await Message.find({createdBy:userid})
        res.status(200).json({
            success: true,
            messages
        });
     } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
     }
}

module.exports = { message, reply, getAllMessages, getUserMessage }