const express = require('express')
const router = express.Router()

// -------------------------------------------------------------------------------------------

const users = require('./modules/users')
const todos = require('./modules/todos')
const auth = require('./modules/auth')
const home = require('./modules/home')

const { authenticator } = require('../middleware/auth')  // 掛載 middleware

// -------------------------------------------------------------------------------------------

router.use('/auth', auth)
router.use('/users', users)

router.use('/todos', authenticator, todos)

router.use('/', authenticator, home)

// -------------------------------------------------------------------------------------------

console.log('passing routes/index.js')

module.exports = router