const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.render('signup')
})

router.post('/', (req, res) => {
    res.send('user signup post req')
})

module.exports = router