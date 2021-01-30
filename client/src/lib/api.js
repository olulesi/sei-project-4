import axios from 'axios'

// import { getToken } from './auth'

const baseUrl = '/api'

// function headers() {
//   return {
//     headers: { Authorization: `Bearer ${getToken()}` }
//   }
// }

//* AUTH Requests

export function registerUser(formdata) {
  return axios.post(`${baseUrl}/auth/register/`, formdata)
}

export function loginUser(formdata) {
  return axios.post(`${baseUrl}/auth/login/`, formdata)
}


// * KANBAN Requests

export function getKanban(id) {
  return axios.get(`${baseUrl}/kanbans/${id}/`)
}

export function editTicket(id, formdata) {
  return axios.put(`${baseUrl}/tickets/${id}/`, formdata)
}