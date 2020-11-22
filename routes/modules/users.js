const express = require('express')
const router = express.Router()

const bcrypt = require('bcryptjs')
const passport = require('passport')

const db = require('../../models')
// const Todo = db.Todo
const User = db.User

// -------------------------------------------------------------------------------------------

// router.get('/', (req, res) => {
//     res.send('hello world')
// })

router.get('/login', (req, res) => {
    res.render('login')
})

router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login'
}))

router.get('/register', (req, res) => {
    res.render('register')
})

router.post('/register', (req, res) => {
    const { name, email, password, confirmPassword } = req.body
    User.findOne({ where: { email } }).then(user => {
        if (user) {
            console.log('User already exists')
            return res.render('register', {
                name,
                email,
                password,
                confirmPassword
            })
        }
        return bcrypt
            .genSalt(10)
            .then(salt => bcrypt.hash(password, salt))
            .then(hash => User.create({
                name,
                email,
                password: hash
            }))
            .then(() => res.redirect('/'))
            .catch(err => console.log(err))
    })
})

// router.post('/register', (req, res) => {
//     res.send('register')
// })

router.get('/logout', (req, res) => {
    // 其中的 req.logout() 是 Passport.js 提供的函式，會幫你清除 session。登出之後，我們就把使用者帶回登入頁面
    req.logout()
    req.flash('success_msg', '你已經成功登出。')
    res.redirect('/users/login')
})

// -------------------------------------------------------------------------------------------

module.exports = router