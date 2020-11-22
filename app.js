const express = require('express')
const exphbs = require('express-handlebars')
const session = require('express-session')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const routes = require('./routes')

// -------------------------------------------------------------------------------------------

// 載入設定檔，要寫在 express-session 以後
const usePassport = require('./config/passport')

// -------------------------------------------------------------------------------------------

const app = express()
const PORT = process.env.PORT

// -------------------------------------------------------------------------------------------

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(bodyParser.urlencoded({ extended: true }))

app.use(methodOverride('_method'))

// -------------------------------------------------------------------------------------------

app.use(session({
    secret: process.env.SESSION_SECRET,
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