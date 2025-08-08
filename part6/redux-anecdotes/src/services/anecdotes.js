import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const object = { content, votes: 0 }
  const response = await axios.post(baseUrl, object)
  return response.data
}

const updateVote = async (id) => {
    const idURL = `${baseUrl}/${id}`
    const anecdote = await axios.get(idURL)
    const response = await axios.put(idURL, {...anecdote.data, votes: anecdote.data.votes+1})
    return response
}

export default { getAll,
    createNew,
    updateVote
 }