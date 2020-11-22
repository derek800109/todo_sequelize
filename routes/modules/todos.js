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
    const UserId = req.user.id
    const name = req.body.name

    return Todo.create({ name, UserId })
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

// ------------------------------------------------------------------------------------------- edit

router.get('/:id/edit', (req, res) => {
    // const UserId = req.user.id
    const id = req.params.id

    return Todo.findByPk(id)
        .then(todo => res.render('edit', { todo: todo.toJSON() }))
        .catch(error => console.log(error))
})

router.put('/:id', (req, res) => {
    // const userId = req.user._id
    const id = req.params.id
    const { name, isDone } = req.body

    return Todo.findByPk(id)
        .then(todo => {
            todo.name = name
            todo.isDone = isDone === 'on'
            return todo.save()
        })
        .then(() => res.redirect(`/todos/${id}`))
        .catch(error => console.log(error))
})

// -------------------------------------------------------------------------------------------

module.exports = router
