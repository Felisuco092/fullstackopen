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
    if(request.body.password?.length < 3) {
        return response.status(400).json({error: "The password must be at leat 3 characters of length"})
    }
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
