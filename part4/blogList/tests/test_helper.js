const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: "Mi vida lujosa en verano",
    author: "Felix",
    url: "pruebaaaaaaaaaaa",
    likes: 8
  },
  {
    title: "Que guayyyyyyyy",
    author: "Pepe",
    url: "http://olaaaaaaaaa.com",
    likes: 4
  }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
    initialBlogs,
    blogsInDb
}