

import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from "../services/anecdotes"

const anecdoteSlice = createSlice({
    name: 'anecdote',
    initialState: [],
    reducers: {
        likeAnAnecdoteOf(state, action) {
          const finalState = state.map(anecdote => anecdote.id === action.payload ? { ...anecdote, votes: anecdote.votes + 1 } : anecdote)
          return finalState
        },
        newAnecdote(state, action) {
          return state.concat(action.payload)
        },
        setAnecdotes(state, action) {
          return action.payload
        }
    },
})

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const anecdote = await anecdoteService.createNew(content)
    dispatch(newAnecdote(anecdote))
  }
}

export const likeAnAnecdote = (id) => {
  return async dispatch => {
    await anecdoteService.updateVote(id)
    dispatch(likeAnAnecdoteOf(id))
  }
}


export const { likeAnAnecdoteOf, setAnecdotes, newAnecdote } = anecdoteSlice.actions
export default anecdoteSlice.reducer