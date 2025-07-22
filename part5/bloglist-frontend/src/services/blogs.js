import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (tokenSet) => {
  token = tokenSet
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const post = (blog) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = axios.post(baseUrl, blog, config)
  return response.then(res => res.data)
}

const put = (blog, id) => {
  const response = axios.put(`${baseUrl}/${id}`, blog)
  return response.then(res => res.data)
}

const deleteBlog = (id) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = axios.delete(`${baseUrl}/${id}`, config)
  return response.then(res => res.data)
}

export default { getAll, setToken, post, put, deleteBlog }