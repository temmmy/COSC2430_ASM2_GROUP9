const { Router } = require('express');
const authController = require('../controllers/authController');

const router = Router()

router.get('/customerREG', authController.signup_get)
router.post('/customerREG', authController.signup_post)
router.get('/customerLOG', authController.login_get)
router.post('/customerLOG', authController.login_post)

module.exports = router;