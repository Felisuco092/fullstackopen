const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response, next) => {
  try{
    response.json( await Blog.find({}))
  } catch(error) {
    next(error)
  }
})

blogsRouter.post('/', async (request, response, next) => {
  const blog = new Blog(request.body)
  
  try {
    response.status(201).json(await blog.save())
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