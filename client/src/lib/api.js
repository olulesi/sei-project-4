import axios from 'axios'

import { getToken } from './auth'

const baseUrl = '/api'

export function headers() {
  return {
    headers: { Authorization: `Bearer ${getToken()}` }
  }
}


//* AUTH Requests

export function registerUser(formdata) {
  return axios.post(`${baseUrl}/auth/register/`, formdata)
}

export function loginUser(formdata) {
  return axios.post(`${baseUrl}/auth/login/`, formdata)
}

export function getUserProfile() {
  return axios.get(`${baseUrl}/auth/profile/`, headers())
}

export function editUserProfile(formdata) {
  return axios.put(`${baseUrl}/auth/profile/`, formdata, headers())
}

export function findUser(email) {
  return axios.get(`${baseUrl}/auth/user/${email}`)
}

// export function findUser(email) {
//   return axios.get(`${baseUrl}/auth/user/${email}`, headers())
// }


// * KANBAN Requests

export function createKanban(formdata) {
  return axios.post(`${baseUrl}/kanbans/`, formdata, headers())
}

export function getKanban(id) {
  return axios.get(`${baseUrl}/kanbans/${id}/`)
}

// export function getKanban(id) {
//   return axios.get(`${baseUrl}/kanbans/${id}/`, headers())
// }

export function editKanban(id, formdata) {
  return axios.put(`${baseUrl}/kanbans/${id}/`, formdata)
}

// export function editKanban(id, formdata) {
//   return axios.put(`${baseUrl}/kanabans/${id}/`, formdata, headers())
// }

export function deleteKanban(id) {
  return axios.delete(`${baseUrl}/kanbans/${id}`, headers())
}


// * COLUMN Requests

export function createColumn(formdata) {
  return axios.post(`${baseUrl}/columns/`, formdata)
}

// export function createColumn(formdata) {
//   return axios.post(`${baseUrl}/columns/`, formdata, headers())
// }

export function editColumn(id, formdata) {
  return axios.put(`${baseUrl}/columns/${id}/`, formdata)
}

// export function editColumn(id, formdata) {
//   return axios.put(`${baseUrl}/columns/${id}/`, formdata, headers())
// }

export function deleteColumn(id) {
  return axios.delete(`${baseUrl}/columns/${id}`)
}

// export function deleteColumn(id) {
//   return axios.delete(`${baseUrl}/columns/${id}`, headers())
// }


// * TICKET Requests

export function createTicket(formdata) {
  return axios.post(`${baseUrl}/tickets/`, formdata)
}

// export function createTicket(formdata) {
//   return axios.post(`${baseUrl}/tickets/`, formdata, headers())
// }

export function getTicket(id) {
  return axios.get(`${baseUrl}/tickets/${id}`)
}

// export function getTicket(id) {
//   return axios.get(`${baseUrl}/tickets/${id}`, headers())
// }

export function editTicket(id, formdata) {
  return axios.put(`${baseUrl}/tickets/${id}/`, formdata)
}

// export function editTicket(id, formdata) {
//   return axios.put(`${baseUrl}/tickets/${id}/`, formdata, headers())
// }

export function deleteTicket(id) {
  return axios.delete(`${baseUrl}/tickets/${id}/`)
}

// export function deleteTicket(id) {
//   return axios.delete(`${baseUrl}/tickets/${id}/`, headers())
// }