const { Router } = require('express');
const authController = require('../controllers/authController');
const multer = require('multer');
const upload = require('../middleware/uploadMiddleware')

const router = Router()

// Routers for customer user
router.get('/customerREG', authController.customer_signup_get)
router.post('/customerREG', upload.single('profilePicture'), authController.customer_signup_post)
router.get('/customerLOG', authController.customer_login_get)
router.post('/customerLOG', authController.customer_login_post)


// Routes for vendor user
router.get('/vendorREG', authController.vendor_signup_get)
router.post('/vendorREG', upload.single('profilePicture'), authController.vendor_signup_post)
router.get('/vendorLOG', authController.vendor_login_get)
router.post('/vendorLOG', authController.vendor_login_post)

// Routes for shipper user
router.get('/shipperREG', authController.shipper_signup_get)
router.post('/shipperREG', upload.single('profilePicture'), authController.shipper_signup_post)
router.get('/shipperLOG', authController.shipper_login_get)
router.post('/shipperLOG', authController.shipper_login_post)

router.get('/logout', authController.logout_get)

module.exports = router
