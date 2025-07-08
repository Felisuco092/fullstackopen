const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => {
        return blog.likes+sum
    }, 0)
}

const favouriteBlog = (blogs) => {
    return blogs.reduce((max_likes, blog) => {
        if(max_likes == -1) {
            return blog
        }
        if(blog.likes > max_likes.likes) {
            return blog
        } else {
            return max_likes
        }
    }, -1) 
}

const mostBlogs = (blogs) => {
    const count = _.countBy(blogs, 'author')
    const maxAuthor = _.maxBy(Object.keys(count), author => count[author])

    return {
        author: maxAuthor,
        blogs: count[maxAuthor] 
    }
}

const mostLikes = (blogs) => {
    const maxBlog = _.maxBy(blogs, (blog) => blog.likes)
    return {
        author: maxBlog.author,
        likes: maxBlog.likes
    }
}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes
}