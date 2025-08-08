

import { createSlice } from "@reduxjs/toolkit"
import { act } from "react"

const anecdoteSlice = createSlice({
    name: 'anecdote',
    initialState: [],
    reducers: {
        likeAnAnecdoteOf(state, action) {
          const finalState = state.map(anecdote => anecdote.id === action.payload ? { ...anecdote, votes: anecdote.votes + 1 } : anecdote)
          return finalState
        },
        newAnecdote(state, action) {
          return state.concat(asObject(action.payload))
        },
        setAnecdotes(state, action) {
          return action.payload
        }
    },
})


export const { likeAnAnecdoteOf, newAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer