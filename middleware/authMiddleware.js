const jwt = require('jsonwebtoken')

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt
    if (token) {
        jwt.verify(token, 'customer secret', (err, decodedToken) => {
            if (err) {
                console.log(err.message)
                res.redirect('customerLOG')

            }
            else {
                console.log(decodedToken)
                next()
            }
        })
    }
    else {
        res.redirect('/customerLOG')
    }
}

module.exports = { requireAuth };
