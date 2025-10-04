const express = require('express')
const firmController = require('../controllers/firm.controller')
const { verifyToken } = require('../middlewares/verifytoken')
const router = express.Router()
router.post('/add-firm',verifyToken,firmController.addFirm)
router.delete('/deleteFirm/:firmId',verifyToken,firmController.deleteFirm)

module.exports = router
