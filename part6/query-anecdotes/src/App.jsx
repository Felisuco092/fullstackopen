import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { useTemporalNotification } from './NotificationContext'

const App = () => {

  const queryClient = useQueryClient()
  const showNotification = useTemporalNotification()

  const voteAnAnecdoteMutation = useMutation({
    mutationFn: (anecdote) => {
      return axios.put(`http://localhost:3001/anecdotes/${anecdote.id}`, {...anecdote, votes: anecdote.votes+1})
        .then(res => res.data)
    },
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.map(anecdote => anecdote.id === newAnecdote.id ? newAnecdote : anecdote))
    }
  })


  const handleVote = (anecdote) => {
    console.log('vote')
    showNotification(`anecdote '${anecdote.content}' voted`, 5)
    voteAnAnecdoteMutation.mutate(anecdote)
  }


  const query = useQuery({
    queryKey: ['anecdotes'],
    queryFn: () => axios.get('http://localhost:3001/anecdotes/').then(res => res.data),
    retry: 1
  })


  if(query.isLoading) {
    return <div>Loading...</div>
  }

  if(query.isError) {
    return (
      <p>
        anecdote service not avialiable due to problems in server
      </p>
    )
  }

  if(query.isSuccess) {
    const anecdotes = query.data
    return (
      <div>
        <h3>Anecdote app</h3>
      
        <Notification />
        <AnecdoteForm />
      
        {anecdotes.map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => handleVote(anecdote)}>vote</button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default App
