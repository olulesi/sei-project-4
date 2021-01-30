import axios from 'axios'

import { getToken } from './auth'

const baseUrl = '/api'

function headers() {
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


// * KANBAN Requests

export function createKanban(formdata) {
  return axios.post(`${baseUrl}/kanbans/`, formdata)
}

// export function createKanban(formdata) {
//   return axios.post(`${baseUrl}/kanbans/`, formdata, headers())
// }

export function getKanban(id) {
  return axios.get(`${baseUrl}/kanbans/${id}/`)
}

// export function getKanban(id) {
//   return axios.get(`${baseUrl}/kanbans/${id}/`, headers())
// }

export function editKanban(id, formdata) {
  return axios.put(`${baseUrl}/kanabans/${id}/`, formdata)
}

// export function editKanban(id, formdata) {
//   return axios.put(`${baseUrl}/kanabans/${id}/`, formdata, headers())
// }

export function deleteKanban(id) {
  return axios.delete(`${baseUrl}/kanbans/${id}`)
}

// export function deleteKanban(id) {
//   return axios.delete(`${baseUrl}/kanbans/${id}`, headers())
// }


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


// * COMMENT Requests

export function createComment(formdata) {
  return axios.post(`${baseUrl}/comments/`, formdata, headers())
}

export function editComment(id, formdata) {
  return axios.put(`${baseUrl}/comments/${id}/`, formdata, headers())
}

export function deleteComment(id) {
  return axios.delete(`${baseUrl}/comments/${id}`, headers())
}


// * TASK Requests

export function createTask(formdata) {
  return axios.post(`${baseUrl}/tasks/`, formdata)
}

// export function createTask(formdata) {
//   return axios.post(`${baseUrl}/tasks/`, formdata, headers())
// }

export function editTask(id, formdata) {
  return axios.put(`${baseUrl}/tasks/${id}/`, formdata)
}

// export function editTask(id, formdata) {
//   return axios.put(`${baseUrl}/tasks/${id}/`, formdata, headers())
// }

export function deleteTask(id) {
  return axios.delete(`${baseUrl}/tasks/${id}`)
}

// export function deleteTask(id) {
//   return axios.delete(`${baseUrl}/tasks/${id}`, headers())
// }