const mongoose = require('mongoose')

const firmSchema = new mongoose.Schema({
    firmName:{
        type:String,
        unique:true,
        required:true
    },
    area:{
        type:String,
        required:true

    },
    category:{
        type:{
            type:[{
                type:String,
                enum:['veg','non-veg']
            }]
        }

    },
    region:{
        type:[
            {
            type:String,
            enum:['south-indian','north-indian','chinese','bakery']
            }
        ]

    },
    offer:{
        type:String
    },
    vendor:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Vendor'
    }]
})

const Firm = new mongoose.model('Firm',firmSchema)
module.exports = Firm