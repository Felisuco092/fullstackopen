const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcryptjs')

blogsRouter.get('/', async (request, response, next) => {
  try{
    response.json( await Blog.find({}).populate('user', {username: 1, name: 1}))
  } catch(error) {
    next(error)
  }
})

blogsRouter.post('/', async (request, response, next) => {
  try {
    const body = request.body
    const user = await User.findOne({})
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user._id
    })
    console.log(blog)
    const savedBlog = new Blog(blog)
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(await savedBlog.save())
  } catch(error) {
    next(error)
  }
})

blogsRouter.delete('/:id', async (request, response, next) => {
  const id = request.params.id
  
  try {
    await Blog.findByIdAndDelete(id)
    response.status(204).end()
  } catch(error) {
    next(error)
  }
})

blogsRouter.put('/:id', async (request, response, next) => {
  const id = request.params.id
  const body = request.body


  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }


  try {
    const updatedBlog = await Blog.findByIdAndUpdate(id, blog, { new: true, runValidators: true })
    response.json(updatedBlog)
  } catch(error) {
    next(error)
  }
})

module.exports = blogsRouter