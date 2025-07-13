const bcrypt = require('bcryptjs')
const usersRouter = require('express').Router()
const User = require('../models/user')


usersRouter.get('/', async (request, response, next) => {
    try {
        const users = await User.find({})
        response.json(users)
    } catch (error) {
        next(error)
    }
})

usersRouter.post('/', async (request, response, next) => {
    const passwordHash = bcrypt.hashSync(request.body.password, 10)


    try{
        const user = new User({
            username: request.body.username,
            name: request.body.name,
            passwordHash: passwordHash
        })
        const savedUser = await user.save()
        response.status(201).json(savedUser)
    }catch(error) {
        next(error)
    }
})

module.exports = usersRouter
