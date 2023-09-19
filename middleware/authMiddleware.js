const jwt = require('jsonwebtoken')

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt

    // checking if web token exists and verified
    if (token) {
        jwt.verify(token, 'user secret', (err, decodedToken) => {
            if (err) {
                console.log(err.message)
                res.redirect('login')

            }
            else {
                console.log(decodedToken)
                next()
            }
        })
    }
    else {
        res.redirect('/login')
    }
}

// check current  user
const checkUser = (req, res, nex) => {
    const token = req.cookies.jwt;

    if (token) {
        jwt.verify(token, 'user secret', (err, decodedToken) => {
            if (err) {
                console.log(err.message)
                res.redirect('login')
                next()
            }
            else {
                console.log(decodedToken)
                next()
            }
        })
    }
}

module.exports = { requireAuth };
