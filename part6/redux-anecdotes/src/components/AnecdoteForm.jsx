import { useDispatch } from "react-redux"
import { newAnecdote } from "../reducers/anecdoteReducer"
import { notificationChange } from "../reducers/notificationReducer"
import anecdoteService from "../services/anecdotes"

const AnecdoteForm = () => {

    const dispatch = useDispatch()

    const message = (content) => {
        dispatch(notificationChange('You created \'' + content + '\''))
        setTimeout(() => {
          dispatch(notificationChange(''))
        }, 5000)
    }

    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        const anecdote = await anecdoteService.createNew(content)
        dispatch(newAnecdote(anecdote))
        message(content)
      }

    return (
        <>
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
                <div><input name='anecdote'/></div>
                <button>create</button>
            </form>
        </>
    )
}

export default AnecdoteForm