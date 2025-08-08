import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
    name: 'notification',
    initialState: '',
    reducers: {
        notificationChange(state, action) {
            return action.payload
        }
    },
})


export const setNotification = (message, time) => {
    return dispatch => {
        dispatch(notificationChange(message))
        setTimeout(() => {
            dispatch(notificationChange(''))
        }, time * 1000)
    }
}


export const { notificationChange } = notificationSlice.actions
export default notificationSlice.reducer