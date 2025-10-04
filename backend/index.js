const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.configDotenv()
const app = express()
const port = process.env.PORT
const uri = process.env.MONGO_URI

app.use(express.json())
app.use(cors())
const vendorRoutes = require('./routes/vendor.routes')
const firmRoutes = require('./routes/firm.routes')
const productRoute = require('./routes/product.route')
const  {verifyToken}  = require('./middlewares/verifytoken')

app.use('/vendors',vendorRoutes)
app.use('/firm',firmRoutes)
app.use('/product',productRoute)





mongoose.connect(uri).then(()=>{
    console.log('db connected successfuly')
}).catch((e)=>{
    console.log('error in connect mongodb',e)
})
app.listen(port,()=>{
    console.log('server started in ',port)
})