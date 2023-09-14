const { Router } = require('express');
const authController = require('../controllers/authController');
const multer = require('multer');
const upload = require('../middleware/uploadMIddleware')

const router = Router()

// Routers for customer user
router.get('/customerREG', authController.customer_signup_get)
router.post('/customerREG', upload.single('profilePicture'), authController.customer_signup_post)
router.get('/login', authController.customer_login_get)
router.post('/login', authController.customer_login_post)
router.get('/logout', authController.logout_get)

// Routes for vendor user


// Routes for shipper user
module.exports = router
