import { useState } from "react"
const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [show, setShow] = useState(false)

  const changeView = () => {
    setShow(!show)
  }
  if(show) {
    return (
      <div style={blogStyle}>
        {blog.title}<button onClick={changeView}>hide</button> <br/>
        {blog.url} <br />
        likes {blog.likes} <button>like</button> <br />
        {blog.author} <br />
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