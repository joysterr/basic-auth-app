const express = require('express')
const bcrypt = require('bcryptjs')
const router = express.Router()

const User = require('../models/User')

router.get('/', (req, res) => {
    res.render('signup')
})

router.post('/', async (req, res) => {
    const exists = await User.findOne({ username: req.body.username }).exec()
    console.log(exists)
    if (exists) {
        res.render('signup', { error: "User already exists" })
    } else {
        try {
            const hashedPassword = await bcrypt.hash(req.body.password, 10)

            const newUser = new User({
                username: req.body.username,
                password: hashedPassword
            })

            const result = await newUser.save()
            res.redirect('/')
        } catch (error) {
            console.error(error)
        }
    }
})

module.exports = router