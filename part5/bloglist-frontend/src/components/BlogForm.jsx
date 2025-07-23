import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({ title, author, url })
    setAuthor('')
    setTitle('')
    setUrl('')
  }
  return (
    <form onSubmit={addBlog}>
      <div>
          title:
        <input value={title} onChange={(event) => setTitle(event.target.value)} id='title-input'/>
      </div>
      <div>
          author:
        <input value={author} onChange={(event) => setAuthor(event.target.value)} id='author-input'/>
      </div>
      <div>
          url:
        <input value={url} onChange={(event) => setUrl(event.target.value)} id='url-input'/>
      </div>
      <button type="submit">create</button>
    </form>
  )
}

export default BlogForm