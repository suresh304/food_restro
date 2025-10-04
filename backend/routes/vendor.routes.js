const vendorController = require('../controllers/vendor.controller')
const productController = require('../controllers/product.controller')
const express = require('express')
const router = express.Router()

router.post('/register',vendorController.vendorRegister)
router.post('/login',vendorController.vendorLogin)
router.get('/getAllVendors',vendorController.getAllVendors)
router.get('/getVendorById/:id',vendorController.getVendorById)
router.get('getProductsByFirmId/:firmId',productController.getProductByFirmId)

module.exports = router