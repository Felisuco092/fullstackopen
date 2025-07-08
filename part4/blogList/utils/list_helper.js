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

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog
}