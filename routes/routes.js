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



// Route for adding product (vendor)
router.post('/addProduct', upload.single('image'), controller.vendor_add_product_post)
// Route for deleing product (vendor)
router.get('/delete/:id', controller.vendor_delete_product_get)
// Route for editing product (vendor)
router.post('/editProduct/:id', upload.single('image'), controller.vendor_edit_product_post)
// Route for adding to cart (customer)
router.post('/addToCart', controller.customer_add_to_cart_post)
// Route for deleting an item from cart (customer )
router.get('/removeItem/:id', controller.customer_remove_item_get)

// Route for ordering itesm from cart (customer)
router.post('/addOrder', controller.customer_add_order_post)

router.post('/updateProfilePicture', upload.single('image'), controller.user_change_profile_picture_post)

// Route for editting status (Shipper)
router.post('/editStatus', controller.shipper_edit_status_post)

// Route for logging out (everyone)
router.get('/logout', controller.logout_get)




module.exports = router
