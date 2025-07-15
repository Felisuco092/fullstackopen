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
const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}

const tokenExtractor = ( request, response, next ) => {
    let authorization = request.get('authorization')
    if (authorization && authorization.startsWith('Bearer ')) {
        authorization = authorization.replace('Bearer ', '')
    }

    request.token = authorization
    next()
}

module.exports = {
    unknownEndpoint,
    errorMiddleware,
    tokenExtractor
}