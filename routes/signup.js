const express = require('express')
const bcrypt = require('bcryptjs')
const router = express.Router()

const User = require('../models/User')

router.get('/', (req, res) => {
    res.render('signup')
})

router.post('/', async (req, res) => {
    try {
        const user = User.findOne({ username: req.body.username }).exec()

        if (user) {
            res.render('signup', { error: 'User exists. Try Loggin in' })
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10)

        const newUser = new User({
            username: req.body.username,
            password: hashedPassword
        })

        const result = await newUser.save()

        if (result) {
            res.redirect('/')
        }
    } catch (error) {
        console.error(error)
    }

})

module.exports = router