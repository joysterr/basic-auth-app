const express = require('express')
const session = require('express-session')
const logger = require('morgan')
const bcrypt = require('bcryptjs')
const passport = require('passport')
const LocalStrategy = require('passport-local')
const mongoose = require('mongoose')

const indexRouter = require('./routes/index')
const signupRouter = require('./routes/signup')
const loginRouter = require('./routes/login')
const logoutRouter = require('./routes/logout')

const User = require('./models/User')

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

// auth middleware using passport
passport.use(
    new LocalStrategy(async (username, password, done) => {
        try {
            const user = await User.findOne({ username: username })
            if (!user) {
                return done(null, false, { message: 'Incorrect username' })
            }
            const match = await bcrypt.compare(password, user.password)
            if (!match) {
                return done(null, false, { message: 'Incorrect password' })
            }
            return done(null, user)
        } catch (err) {
            return done(err)
        }
    })
)

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id)
        done(null, user)
    } catch (err) {
        done(err)
    }
})

// routes
app.use('/', indexRouter)
app.use('/signup', signupRouter)
app.use('/login', loginRouter)
app.use('/logout', logoutRouter)

// start app
app.listen(port, () => console.log(`dev: server running on localhost:${port}`))