import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'


const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = (data) => {
    const request = axios.post(baseUrl, data)
    return request.then(response => response.data)
}
//Is done in the previous exercise
export default { getAll, create }