import { useState } from "react"
import blogService from '../services/blogs'
const Blog = ({ blog, put }) => {
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
  if(show) {
    return (
      <div style={blogStyle}>
        {blog.title + " " + blog.author} <button onClick={changeView}>hide</button> <br/>
        {blog.url} <br />
        likes {like} <button onClick={handleLike}>like</button> <br />
        {blog.user.username} <br />
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