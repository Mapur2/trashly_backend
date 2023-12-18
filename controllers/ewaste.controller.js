const User = require('../models/user.model')
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

        const url = await uploadFile(photoPath)
        console.log(url)
        const userexist = await User.findById({_id})
        if(!userexist)
        {
            return res.status(403).json({
                success:false,
                message: "No user found"
            })
        }
        const user = await User.findByIdAndUpdate({ _id },
            {
                $push: { 'ewaste': { name, location, photo:url  } }
            })
        fs.unlinkSync(`./uploads/${req.file.filename}`)
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
        // Find the user by ID and update the specific element in the array
        const user = await User.findOneAndUpdate({ "ewaste._id": `${ewasteId}` },
            { $set: { 'ewaste.$.approved': isApproved } },
            { new: true })
        if (!user) {
            return res.status(404).json(
                {
                    success: false,
                    message: 'User or element not found'
                });
        }

        /* const ewaste = await user.ewaste.find().where(`${ewasteId}`)
        console.log(ewasteId) */
        /* if (!ewaste) {
            return res.status(404).json(
                {
                    success: false,
                    message: 'Element not found'
                });
        } */

        res.status(200).json({
            success: true,
            message: 'Approved property updated successfully', user
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
        const user = await User.findOneAndUpdate({ "ewaste._id": `${ewasteId}` },
            { $set: { 'ewaste.$.rejected': isRejected } },
            { new: true })
        if (!user) {
            return res.status(404).json(
                {
                    success: false,
                    message: 'User or element not found'
                });
        }

        res.status(200).json({
            success: true,
            message: 'Rejected property updated successfully', user
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}


module.exports = {
    createEwasteQuery, approveEWaste, rejectEWaste
}