const unknownEndpoint = (request, response, next) => {
    response.status(404).end()
} 

const errorMiddleware = (error, request, response, next) => {
    if(error.message.includes("Blog validation failed")) {
        response.status(400).end()
    }
    next(error)
}

module.exports = {
    unknownEndpoint,
    errorMiddleware
}