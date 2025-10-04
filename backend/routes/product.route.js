const express = require('express')
const productController = require('../controllers/product.controller')
const { verifyToken } = require('../middlewares/verifytoken')
const router = express.Router()
router.post('/add-product/:firmId',verifyToken,productController.addProduct)
router.get('/getProductsByFirmId/:firmId',productController.getProductByFirmId)  
router.delete('/deleteProductById/:productId',productController.deleteProductById)  

module.exports = router
