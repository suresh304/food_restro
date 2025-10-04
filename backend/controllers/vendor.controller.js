const Vendor = require('../Models/Vendor')
const jwt= require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const vendorRegister = async (req, res) => {

    console.log('helloooo')

    const { username, email, password } = req.body
    try {
        const vendorEmail = await Vendor.findOne({ email: email })
        if (vendorEmail) {
            return res.status(400).json('email already exist')
        }

        const hashPassword = await bcrypt.hash(password, 10)



        const newVendor = new Vendor({
            username, email, password: hashPassword
        })

        await newVendor.save()
        res.status(201).json({ message: "vendor registered successfully" })
    } catch (error) {
        console.log('error in saving vendor', error)
    }


}

const vendorLogin = async (req, res) => {
    const { email, password } = req.body


    try {
        const existingUser = await Vendor.findOne({ email })
        if (!existingUser || !(await bcrypt.compare(password, existingUser.password))) {
            res.status(401).json({ message: "invalid credentials" })
        }

   const token =  jwt.sign({vendorId:existingUser._id},process.env.secret,{expiresIn:'1hr'})



        res.status(200).json({ message: 'login successful!' ,token:token})
    } catch (error) {
        console.log('error in loging in', error)
    }

}

const getAllVendors = async (req,res)=>{


    try {
        
        const vendors = await Vendor.find().populate('firm')
        console.log(vendors);
        
        res.status(200).json({vendors})
    } catch (error) {
        console.log('error in getting vendors');

        res.status(500).json({message:"something went wrong"})
        
    }

}

const getVendorById = async(req,res)=>{




try {
   const id = req.params.id
const vend = await Vendor.findById(id)
if(!vend)
    res.status(500).json({message:"no vendor exist"})
res.status(200).json(vend) 
} catch (error) {
    res.status(500).json({err:"something wend wrong"})
}

}
module.exports = { vendorRegister, vendorLogin ,getAllVendors,getVendorById}