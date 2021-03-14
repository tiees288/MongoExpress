const express = require('express')
const app = express()
// app.set('view engine', 'ejs')

const passport = require('passport')
// ประกาศใช้ Strategy
const LocalStrategy = require('passport-local').Strategy

const session = require('express-session')
app.use(session({ secret: 'KrittawatTestPassport@#01.', resave: true, saveUninitialized: true }))
app.use(passport.initialize())
app.use(passport.session())

// const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cookieParser())

app.use(express.static(__dirname + '/public'))

passport.use(new LocalStrategy((username, password, done) => {
    if (username == "admin" && password == "1234") {
        user = {
            _id: 1,
            fname: "KrttawatUser",
            lname: "KrittawatPassword"
        }
        console.log('Correct Password.')
        return done(null, user)
    } else {
        console.log('Incorrect password.')
        return done(null, false, { message: 'Incorrect password.' })
    }
}))

passport.serializeUser((user, done) => {
    console.log('SerializeUser')
    done(null, user) 
})

passport.deserializeUser((user, done) => {
    console.log('DeserializeUser')
    done(null, user) 
})

app.get('/failed', (req, res) => {
    res.status(401).json({
        messages: 'Incorrect Password.'
    })
})

app.get('/home', (req, res) => {
    console.log(req.sessionID)

    res.status(200).json({
        messages: 'Login Success'
    })
})

app.post('/login', passport.authenticate('local', {
    successRedirect: '/home',
    failureRedirect: '/failed'
}))

// app.post('/login', (req, res) => {
//     const username = req.body.username
//     const password = req.body.password

//     console.log(req.body)

//     res.json({
//         username: username,
//         password: password
//     })
// })



app.listen(3000, () => {
    console.log('Server Started on localhost:3000...')
})
