import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { useTemporalNotification } from '../NotificationContext'

const AnecdoteForm = () => {

  const queryClient = useQueryClient()
  const showNotification = useTemporalNotification()

  const newAnecdoteMutation = useMutation({
    mutationFn: (newAnecdote) => axios.post('http://localhost:3001/anecdotes/', newAnecdote).then(response => response.data),
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
      showNotification(`anecdote '${newAnecdote.content}' created`, 5)
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({content, votes: 0})
    console.log('new anecdote')
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
