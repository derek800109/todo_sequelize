const express = require('express')
const router = express.Router()

const db = require('../../models')
const Todo = db.Todo
// const User = db.User

// ------------------------------------------------------------------------------------------- create

router.get('/new', (req, res) => {
    return res.render('new')
})

router.post('/', (req, res) => {
    const userId = req.user._id
    const name = req.body.name

    return Todo.create({ name, userId })
        .then(() => res.redirect('/'))
        .catch(error => console.log(error))
})

// -------------------------------------------------------------------------------------------

router.get('/:id', (req, res) => {
    const id = req.params.id
    return Todo.findByPk(id)
        .then(todo => res.render('detail', { todo: todo.toJSON() }))
        .catch(error => console.log(error))
})


// -------------------------------------------------------------------------------------------

module.exports = router
