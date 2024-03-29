const express = require('express')
const passport = require('passport')
const router = express.Router()

router.post(
    '/',
    passport.authenticate('local', { failureRedirect: '/', failureMessage: true }),
    function (req, res) {
        res.redirect('/')
    }
)

module.exports = router