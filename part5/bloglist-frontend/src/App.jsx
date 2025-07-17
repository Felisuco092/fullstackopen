import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Form from './components/Form'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>{
      setBlogs( blogs )
    })  
  }, [])
  useEffect(() => {
    const infoUser = window.localStorage.getItem("blogListApp")
    if(infoUser) {
      const user = JSON.parse(infoUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = (event) => {
    event.preventDefault()

    loginService.login({
      username: userName,
      password: password
    })
    .then(response => {
      window.localStorage.setItem("blogListApp", JSON.stringify(response))
      blogService.setToken(user.token)
      setUser(response)
      setUserName('')
      setPassword('')
    })
    .catch(error => {
      alert("error in password or username")
    })
  }

  const handleLogOut = () => {
    window.localStorage.removeItem("blogListApp")
    setUser(null)
  }

  const handlePost = () => {
    blogService.post({title, author, url})
  }

  const showBlogs = () => 
    <>
      <h2>blogs</h2>
      <p>{user.name} logged in <button onClick={handleLogOut}>logout</button></p>
      {blogs.map(blog => {
          console.log("blog");
          return <Blog key={blog.id} blog={blog} />
      }
      )}
      <h1>create new</h1>
      <BlogForm handlePost={handlePost} title={title} author={author} url={url}
        setTitle={setTitle} setAuthor={setAuthor} setUrl={setUrl}/>
    </>

  return (
    <div>
      {user === null ? <Form handleLogin={handleLogin} setUsername={setUserName} setPassword={setPassword} 
        username={userName} password={password}/> :
        showBlogs()}
    </div>
  )
}

export default App