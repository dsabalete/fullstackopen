import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

export const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then((response) => response.data)
}

export const create = (newObject) => {
    const request = axios.post(baseUrl, newObject)
    return request.then((response) => response.data)
}

export const remove = (id) => {
    return axios.delete(`${baseUrl}/${id}`)
}

export const update = (id, updatedObj) => {
    const request = axios.put(`${baseUrl}/${id}`, updatedObj)
    return request.then((response) => response.data)
}
