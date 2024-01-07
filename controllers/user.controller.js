const User = require('../models/user.model')
const bcrypt = require('bcrypt');
const path = require('path');
const sendEmail = require('../utils/sendEmail');
const Ewaste = require('../models/ewaste.model')

const register = async (req, res) => {

    const { name, email, password, number } = req.body
    console.log(name, email, password, number)

    if (!name || !email || !password || !number)
        return res.status(403).json(
            {
                success: false,
                message: "Please fill all details"
            }
        )
    const regx = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;

    if (!regx.test(email)) {
        return res.status(403).json(
            {
                success: false,
                message: "Please enter a proper email Id"
            })
    }
    const existingUser = await User.findOne({ email })
    if (existingUser) {
        return res.status(400).json(
            {
                success: false,
                message: "User all ready exists"
            }
        )
    }


    try {

        const encrypt_password = await bcrypt.hash(password, 10)
        //encrypting password
        const user = await User.create({ name, email, password: encrypt_password, number })

        const sendMail = await sendEmail(user.email, `<h1>Hello ${name}<h1><br> Welcome to Trashly, ${name}`) 

        res.status(201).json({
            success: true,
            message: "Successfull",
            userid: user._id
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false })
    }
}

const login = async (req, res) => {
    const { email, password } = req.body

    if (!email || !password)
        return res.status(403).json(
            {
                success: false,
                message: "Please fill all details"
            }
        )
    const regx = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
    if (!regx.test(email)) {
        return res.status(403).json(
            {
                success: false,
                message: "Please enter a proper email Id"
            }
        )
    }
    try {

        const user = await User.findOne({ email })

        if (!user)
            return res.status(403).json(
                {
                    success: false,
                    message: "Please Register At first"
                }
            )
        const checkPass = await bcrypt.compare(password, user.password)
        if (email == user.email && !checkPass) {
            return res.status(403).json(
                {
                    success: false,
                    message: "Invalid password"
                }
            )
        }

        user.password = undefined

        res.status(200).json({
            success: true,
            message: "Logged In Successfully",
            user
        })

    } catch (error) {
        return res.status(403).json(
            {
                success: false,
                message: "Invalid Credentials"
            }
        )
    }

}

const getOtp = async (req, res)=>{
    const {email}=req.body
    if (!email )
        return res.status(403).json(
            {
                success: false,
                message: "Please fill all details"
            }
        )
    try {
        const user = await User.findOne({ email })

        if (!user)
            return res.status(403).json(
                {
                    success: false,
                    message: "User not found"
                }
            )
        
        const otp=Math.floor(Math.random()*9999)+1000
        const sendMail = await sendEmail(email, `<h1>OTP<h1><br> Here's your OTP: ${otp}`) 
        res.status(201).json({
            success: true,
            message: "OTP sent",
            otp
        })

    } catch (error) {
        res.status(500).json({ success: false,message: "OTP not sent" })
    }
    
}

const forgotPassword=async (req,res)=>{
    const {email, newpassword}=req.body
    console.log(email,newpassword)
    try {
        const user = await User.findOne({ email })
        
        if (!user)
            return res.status(403).json(
                {
                    success: false,
                    message: "User not found"
                }
            )
        const encrypt_password = await bcrypt.hash(newpassword, 10)
       
        const updatePassword = await User.findByIdAndUpdate({_id:user._id},
                {
                    $set:{'password':encrypt_password}
                }
            )
        if(!updatePassword)
        return res.status(403).json(
            {
                success: false,
                message: "Unexpected Error"
            }
        )
        const sendMail = await sendEmail(email, `<h1>Hello,${user.name}<h1><br> Your password was changed successfully`) 
        res.status(201).json({
            success: true,
            message: "Password Changed",
        })

    } catch (error) {
        res.status(500).json({ success: false,message: "Password not Changed" })
    }
}

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password')
        return res.status(200).json({
            success: true,
            users
        })
    } catch (error) {
        return res.status(403).json(
            {
                success: false,
                message: "Cannot retrieve"
            })
    }

}

const getUser = async (req, res) => {
    const { userid } = req.params
    try {
        const user = await User.findOne({ _id: userid })
        const ewastes = await Ewaste.find({ createdBy: userid })
        user.password = undefined
        return res.status(200).json({
            success: true,
            user: {
                _id: userid, name: user.name, ewaste: ewastes, points: user.points, number: user.number, email: user.email
            }
        })
    } catch (error) {
        return res.status(403).json(
            {
                success: false,
                message: "Cannot retrieve"
            })
    }

}

const getAllEwastesWithWastes=async (req,res)=>{
    try {
        const users = await User.find().select('-password')
        n=users.length
        for (let i = 0; i < n; i++) 
        {
           const ewaste=await Ewaste.find({createdBy:users[i]._id})
            users[i]={name:users[i].name,number:users[i].number,email:users[i].email,ewaste,_id:users[i]._id}
        }
        res.status(200).json({
            success: true,
            users
        })
    } catch (error) {
        console.log(error)
        return res.status(403).json(
            {
                success: false,
                message: "Cannot retrieve"
            })
    }
}

module.exports = {
    register, login, getAllUsers, getUser,getOtp,forgotPassword,getAllEwastesWithWastes
}

