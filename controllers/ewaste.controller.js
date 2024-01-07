const User = require('../models/user.model');
const Ewaste = require('../models/ewaste.model')
const sendEmail = require('../utils/sendEmail');
const uploadFile = require('../utils/upload')
const fs = require('fs');



const createEwasteQuery = async (req, res) => {

    const { _id, name, location } = req.body
    console.log(_id, name, location)
    const photoPath = req.file.path
    console.log(photoPath)
    if (!name || !location || !_id)
        return res.status(403).json(
            {
                success: false,
                message: "Please enter all details"
            }
        )

    try {
        const userexist = await User.findById({_id})
        if(!userexist)
        {
            return res.status(403).json({
                success:false,
                message: "No user found"
            })
        }
        const url = await uploadFile(photoPath)
        console.log(url)
        const ewaste=await Ewaste.create({name,location,photo:url,createdBy:_id})

        fs.unlinkSync(`./uploads/${req.file.filename}`)

        const sendMail = await sendEmail(user.email, `<h1>Ewaste Created<h1><br> name: ${name} location: ${location} <br> We will reach you in 24 hrs`) 

        return res.status(200).json({
            success: true,
            message: "Ewaste added succesfully",
            name, location
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

const approveEWaste = async (req, res) => {

    const { ewasteId, isApproved } = req.body;

    if (!ewasteId || !isApproved)
        return res.status(403).json(
            {
                success: false,
                message: "Please enter all details"
            }
        )

    try {
        /*// Find the user by ID and update the specific element in the array
        const user = await User.findOneAndUpdate({ "ewaste._id": `${ewasteId}` },
            { $set: { 'ewaste.$.approved': isApproved } },
            { new: true })*/

        const ewaste = await Ewaste.findByIdAndUpdate({ "_id": `${ewasteId}` },
        { $set: { 'approved': isApproved } },
        { new: true })    
        
        if (!ewaste) {
            return res.status(404).json(
                {
                    success: false,
                    message: 'Ewaste not found'
                });
        }
        const userid=ewaste.createdBy
        console.log(userid)
        const user =await User.findById({_id:userid})
        console.log(user)
        const point = await User.findByIdAndUpdate({_id:ewaste.createdBy},
            {
                $set:{'points':user.points+5}
            },
            {new:true})

        const sendMail = await sendEmail(user.email, `<h1>Ewaste Approved<h1><br> name:${ewaste.name}<br>
                                   // location:${ewaste.location}`) 

        res.status(200).json({
            success: true,
            message: 'Approved property updated successfully', ewaste
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const rejectEWaste = async (req, res) => {

    const { ewasteId, isRejected } = req.body;

    if (!ewasteId || !isRejected)
        return res.status(403).json(
            {
                success: false,
                message: "Please enter all details"
            }
        )

    try {
        // Find the user by ID and update the specific element in the array


        const ewaste = await Ewaste.findByIdAndUpdate({ "_id": `${ewasteId}` },
        { $set: { 'rejected': isRejected } },
        { new: true })    
        
        if (!ewaste) {
            return res.status(404).json(
                {
                    success: false,
                    message: 'Ewaste not found'
                });
        }

        const sendMail = await sendEmail(user.email, `<h1>Ewaste Rejected<h1><br>`) 


        res.status(200).json({
            success: true,
            message: 'Rejected property updated successfully', ewaste
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const newEwastesCount = async (req,res)=>{
    
    let count = 0
    try {
        
        const ewastes = await Ewaste.find()
        const m = ewastes.length
            for(j=0;j<m;j++)
            {
                if(!ewastes[j].approved && !ewastes[j].rejected)
                {
                    count++;
                }
            }
        res.status(200).json({
            success: true,
            count
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });    
    }
}

const getAllEwastes=async (req,res)=>{
    try {
        const ewastes = await Ewaste.find()
        res.status(200).json({
            success: true,
            ewastes
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });  
    }
    
}

const getUserEwaste =async (req, res) =>{
    const {userid} = req.params
     try 
     {
        const ewastes = await Ewaste.find({createdBy:userid})
        res.status(200).json({
            success: true,
            ewastes
        });
     } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
     }
}

module.exports = {
    createEwasteQuery, approveEWaste, rejectEWaste, newEwastesCount,getAllEwastes,getUserEwaste
}