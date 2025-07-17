import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Form from './components/Form'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  useEffect(() => {
    blogService.getAll().then(blogs =>{
      setBlogs( blogs )
    })  
  }, [])
  useEffect(() => {
    const infoUser = window.localStorage.getItem("blogListApp")
    if(infoUser) {
      setUser(JSON.parse(infoUser))
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

  const showBlogs = () => 
    <>
      <h2>blogs</h2>
      <p>{user.name} logged in <button onClick={handleLogOut}>logout</button></p>
      {blogs.map(blog => {
          console.log("blog");
          return <Blog key={blog.id} blog={blog} />
      }
      )}
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