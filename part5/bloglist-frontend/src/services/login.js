import axios from 'axios'

const baseUrl = '/api/login'

const login = (credentials) => {
    const response = axios.post(baseUrl, credentials)
    return response.then(res => res.data)
}

export default {login}