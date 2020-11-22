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

// 載入設定檔，要寫在 express-session 以後
const usePassport = require('./config/passport')

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

// 呼叫 Passport 函式並傳入 app，這條要寫在路由之前
usePassport(app)

// -------------------------------------------------------------------------------------------

app.use(routes)

// -------------------------------------------------------------------------------------------

app.listen(PORT, () => {
    console.log(`App is running on http://localhost:${PORT}`)
})