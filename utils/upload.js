const cloudinary = require('cloudinary').v2

cloudinary.config(
    {
        cloud_name:process.env.CLOUD_NAME,
        api_key:process.env.CLOUD_API,
        api_secret : process.env.CLOUD_SECRET
    }
)

const uploadFile = async(filepath)=>{
    try {
        const result = await cloudinary.uploader.upload(filepath)
        return result.secure_url
    } catch (error) {
        console.log(error)
    }
}

module.exports = uploadFile