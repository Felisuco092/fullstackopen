const express = require('express')
const app = express()
const cors = require('cors')
const Blog = require('./models/blog')
const blogsRouter = require('./controllers/blogs')
const userRouter = require('./controllers/users')
const mongoose = require('mongoose')
const config = require('./utils/config')
const middleWares = require('./utils/middlewares')

const mongoUrl = config.MONGO_URI
mongoose.connect(mongoUrl)

app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogsRouter)
app.use('/api/users', userRouter)

app.use(middleWares.unknownEndpoint)
app.use(middleWares.errorMiddleware)



module.exports = app