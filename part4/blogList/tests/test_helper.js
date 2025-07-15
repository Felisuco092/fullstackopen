const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcryptjs')

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

const initialUsers = [
  {
    username: "test_user",
    name: "test",
    passwordHash: bcrypt.hashSync("test", 10)
  },
  {
    username: "test_user2",
    name: "test",
    passwordHash: bcrypt.hashSync("test", 10)
  }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {
    initialBlogs,
    initialUsers,
    blogsInDb,
    usersInDb
}