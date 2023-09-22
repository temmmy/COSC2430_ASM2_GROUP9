const { Router } = require('express');
const controller = require('../controllers/controller');
const multer = require('multer');
const upload = require('../middleware/uploadMiddleware')

const router = Router()

// Routers for customer user
router.get('/customerREG', controller.customer_signup_get)
router.post('/customerREG', upload.single('profilePicture'), controller.customer_signup_post)
router.get('/customerLOG', controller.customer_login_get)
router.post('/customerLOG', controller.customer_login_post)


// Routes for vendor user
router.get('/vendorREG', controller.vendor_signup_get)
router.post('/vendorREG', upload.single('profilePicture'), controller.vendor_signup_post)
router.get('/vendorLOG', controller.vendor_login_get)
router.post('/vendorLOG', controller.vendor_login_post)

// Routes for shipper user
router.get('/shipperREG', controller.shipper_signup_get)
router.post('/shipperREG', upload.single('profilePicture'), controller.shipper_signup_post)
router.get('/shipperLOG', controller.shipper_login_get)
router.post('/shipperLOG', controller.shipper_login_post)

router.get('/logout', controller.logout_get)

// Routes for adding product (vendor)
router.post('/addProduct', upload.single('image'), controller.vendor_add_product_post)

module.exports = router
