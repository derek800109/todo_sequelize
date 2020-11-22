const express = require('express')
const exphbs = require('express-handlebars')
const session = require('express-session')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const bcrypt = require('bcryptjs')

const routes = require('./routes')

const db = require('./models')
const Todo = db.Todo
const User = db.User

// -------------------------------------------------------------------------------------------

const app = express()
const PORT = 3000

// -------------------------------------------------------------------------------------------

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(bodyParser.urlencoded({ extended: true }))

app.use(methodOverride('_method'))

// -------------------------------------------------------------------------------------------

app.use(session({
    secret: 'ThisIsMySecret',
    resave: false,
    saveUninitialized: true
}))



// -------------------------------------------------------------------------------------------

app.use(routes)

// -------------------------------------------------------------------------------------------

app.listen(PORT, () => {
    console.log(`App is running on http://localhost:${PORT}`)
})