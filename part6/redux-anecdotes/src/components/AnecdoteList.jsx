import { useDispatch, useSelector } from "react-redux"
import { likeAnAnecdoteOf } from "../reducers/anecdoteReducer"

const Anecdote = ({ vote, anecdote }) => {
    return (
        <div>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
    )
}

const AnecdoteList = () => {

    const dispatch = useDispatch()
    const anecdotes = useSelector(state => {
      return state.anecdotes.filter(anecdote => anecdote.content.includes(state.filter))
    })

    const vote = (id) => {
        console.log('vote', id)
        dispatch(likeAnAnecdoteOf(id))
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