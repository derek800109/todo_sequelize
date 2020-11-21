const express = require('express')
const router = express.Router()

// -------------------------------------------------------------------------------------------

const users = require('./modules/users')

// -------------------------------------------------------------------------------------------

router.use('/users', users)

// -------------------------------------------------------------------------------------------

console.log('passing routes/index.js')

module.exports = router