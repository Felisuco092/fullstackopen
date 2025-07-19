import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Form from './components/Form'
import BlogForm from './components/BlogForm'
import CorrectMessage from './components/CorrectMessage'
import ErrorMessage from './components/ErrorMessage'
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

  const [correctMessage, setCorrectMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

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
      blogService.setToken(response.token)
      setUser(response)
      setUserName('')
      setPassword('')
    })
    .catch(error => {
      setErrorMessage("error in password or username")
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    })
  }

  const handleLogOut = () => {
    window.localStorage.removeItem("blogListApp")
    setUser(null)
  }

  const handlePost = (event) => {
    event.preventDefault()
    blogService.post({title, author, url})
    .then(msg => {
      setBlogs(blogs.concat(msg))
      setCorrectMessage({title: msg.title,
        author: msg.author})
      setTimeout(() => {
        setCorrectMessage(null)
      }, 3000)
    })
    .catch((error) => {
      setErrorMessage(error.message)
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    })
  }

  const showBlogs = () => 
    <>
      <h2>blogs</h2>
      {
        correctMessage && <CorrectMessage title={correctMessage.title} author={correctMessage.author} />   
      }
      
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
      {
        errorMessage && <ErrorMessage error={errorMessage} />
      }
      {user === null ? <Form handleLogin={handleLogin} setUsername={setUserName} setPassword={setPassword} 
        username={userName} password={password}/> :
        showBlogs()}
    </div>
  )
}

export default App