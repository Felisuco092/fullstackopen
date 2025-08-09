import { useContext } from "react"
import { useReducer } from "react"
import { createContext } from "react"

const notificationReducer = (state, action) => {
    switch (action.type) {
        case 'CHANGE':
            return action.payload
        case 'CLEAR':
            return ''
        default:
            return state
    }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
    const [notification, dispatcher] = useReducer(notificationReducer, '')

    return (
        <NotificationContext.Provider value={[notification,dispatcher]}>
            {props.children}
        </NotificationContext.Provider>
    )
} 

export const useNotificationValue = () => {
    const notificationAndDispatch = useContext(NotificationContext)
    return notificationAndDispatch[0]
}

export const useNotificationDispatch = () => {
    const notificationAndDispatch = useContext(NotificationContext)
    return notificationAndDispatch[1]
}

export const useTemporalNotification = () => {
    const dispatcher = useNotificationDispatch()
    
    return (message, time) => {
        dispatcher({type: 'CHANGE', payload: message})
        setTimeout(() => {
            dispatcher({type: 'CLEAR'})
        }, time * 1000)
    }
}

export default NotificationContext
