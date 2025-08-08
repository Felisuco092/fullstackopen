import { useDispatch, useSelector } from "react-redux"
import { likeAnAnecdote } from "../reducers/anecdoteReducer"
import { notificationChange } from "../reducers/notificationReducer"

const Anecdote = ({ vote, anecdote }) => {
    return (
        <div>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
          </div>
        </div>
    )
}

const AnecdoteList = () => {

    const dispatch = useDispatch()
    const allAnecdotes = useSelector(state => state.anecdotes)
    const filter = useSelector(state => state.filter)
    
    const anecdotes = allAnecdotes.filter(anecdote => anecdote.content.includes(filter))

    const message = (content) => {
      dispatch(notificationChange('You liked \'' + content + '\''))
      setTimeout(() => {
        dispatch(notificationChange(''))
      }, 5000)
    }

    const vote = (id, content) => {
        dispatch(likeAnAnecdote(id))
        message(content)
    }

    return (
        <>
            {anecdotes
            .sort((a,b) => b.votes - a.votes)
            .map(anecdote =>
            <Anecdote key={anecdote.id} vote={vote} anecdote={anecdote} />
      )}
        </>
    )
}

export default AnecdoteList