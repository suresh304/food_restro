const Vendor = require('../Models/Vendor')
const firm = require('../Models/Firm')
const jwt = require('jsonwebtoken')


const verifyToken = async (req,res,next)=>{

const token = req.headers['token']
if(!token){
    return res.status(401).json({error:"Token is required"})
}

console.log('toooooooooo',token);


try {
    
    const decoded =  jwt.verify(token,process.env.secret)
    const vendor = await Vendor.findById(decoded.vendorId)
    console.log('thisi vendor',vendor);
    
    if(!vendor){
        res.status(401).json({message:"vendor not found"})
    }
    req.vendorId = vendor._id;
next()

} catch (error) {

    console.log('error',error);
    
}

}

module.exports = {verifyToken}