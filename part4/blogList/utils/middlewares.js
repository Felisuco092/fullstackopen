const logger = require('./logger')
const unknownEndpoint = (request, response, next) => {
    response.status(404).end()
} 

const errorMiddleware = (error, request, response, next) => {
    logger.error("--------ERRORR:", error.name)
    if(error.message.includes("Blog validation failed")) {
        response.status(400).end()
    }else if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')) {
    return response.status(400).json({ error: 'expected `username` to be unique' })
    }else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
    }
    next(error)
}

module.exports = {
    unknownEndpoint,
    errorMiddleware
}