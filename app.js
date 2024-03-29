const express = require('express')
const session = require('express-session')
const logger = require('morgan')
const passport = require('passport')
const LocalStrategy = require('passport-local')
const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')

const indexRouter = require('./routes/index')

const app = express()
const port = 3000

//db setup
mongoose.connect(process.env.DB_URI)
    .then(console.log('dev: db connected'))
    .catch(err => console.error(err))

// view engine
app.set('view engine', 'ejs')

// middleware
app.use(session({ secret: "cats", resave: false, saveUninitialized: true }))
app.use(passport.session())
app.use(express.urlencoded({ extended: false }))
app.use(logger('dev'))
app.use(express.static('public'))

// routes
app.get('/', indexRouter)

// start app
app.listen(port, () => console.log(`dev: server running on localhost:${port}`))