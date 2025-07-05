import axios from 'axios'

const baseUrl = '/api/persons'


const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = (data) => {
    const request = axios.post(baseUrl, data)
    return request.then(response => response.data)
}

const deleteNote = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}

const update = (id, changedNote) => {
    const request = axios.put(`${baseUrl}/${id}`, changedNote)
    return request.then(response => response.data)
}
export default { getAll, create, deleteNote, update }