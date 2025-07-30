const filterReducer = (state = '', action) => {
    switch (action.type) {
        case 'NEW_FILTER':
            return action.payload
        default:
            return state
    }
}

export const filterChange = (filter) => {
    return {
        type: 'NEW_FILTER',
        payload: filter
    }
}

export default filterReducer