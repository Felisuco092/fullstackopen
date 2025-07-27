import { useState } from 'react'
import blogService from '../services/blogs'
const Blog = ({ blog, put, handleRemove, user }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [show, setShow] = useState(false)
  const [like, setLike] = useState(blog.likes)

  const changeView = () => {
    setShow(!show)
  }
  const handleLike = () => {
    put(like, blog, setLike)
  }
  const remove = () => {
    if (window.confirm(`Remove blog ${blog.title + ' by ' + blog.author}`)) {
      handleRemove(blog.id)
    }
  }
  if(show) {
    return (
      <div style={blogStyle}>
        {blog.title + ' ' + blog.author} <button onClick={changeView}>hide</button> <br/>
        {blog.url} <br />
        likes <span data-testid="like-count">{like}</span> <button onClick={handleLike} data-testid="like-button">like</button> <br />
        {blog.user.username} <br />
        {user && blog.user.username === user.username && <button onClick={remove}>remove</button>}
      </div>
    )
  } else {
    return (
      <div style={blogStyle}>
        {blog.title} {blog.author}
        <button onClick={changeView}>view</button>
      </div>
    )
  }
}

export default Blog