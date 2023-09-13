const { Router } = require('express');
const authController = require('../controllers/authController');
const multer = require('multer');
const upload = require('../middleware/uploadMIddleware')

const router = Router()

router.get('/customerREG', authController.signup_get)
router.post('/customerREG', upload.single('profilePicture'), authController.signup_post)
router.get('/customerLOG', authController.login_get)
router.post('/customerLOG', authController.login_post)
router.get('/logout', authController.logout_get)

module.exports = router
