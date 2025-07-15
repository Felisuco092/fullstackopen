const User = require('../models/user')
const jwt = require('jsonwebtoken')

const logger = require('./logger')
const unknownEndpoint = (request, response, next) => {
    response.status(404).end()
} 

const errorMiddleware = (error, request, response, next) => {
    logger.error("--------ERRORR:", error.name)
    if(error.message.includes("Blog validation failed")) {
        return response.status(400).end()
    }else if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')) {
        return response.status(400).json({ error: 'expected `username` to be unique' })
    }else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    } else if (error.name ===  'JsonWebTokenError') {
        return response.status(401).json({ error: 'token invalid' })
    }
    next(error)
}


const tokenExtractor = ( request, response, next ) => {
    let authorization = request.get('authorization')
    if (authorization && authorization.startsWith('Bearer ')) {
        authorization = authorization.replace('Bearer ', '')
    }

    request.token = authorization
    next()
}

const userExtractor = async ( request, response, next ) => {
    try{
        const decodedToken = jwt.verify(request.token, process.env.SECRET)
        if(!decodedToken.id) {
          return response.status(401).json({ error: 'token invalid' })
        }
        request.user = await User.findById(decodedToken.id)
        next()
    }catch(error) {
        next(error)
    }
}

module.exports = {
    unknownEndpoint,
    errorMiddleware,
    tokenExtractor,
    userExtractor
}