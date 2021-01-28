import axios from 'axios'
// import { getToken, getUserId } from './auth'
const baseUrl = '/api/auth'

//* AUTH Requests

export function registerUser(formdata) {
  return axios.post(`${baseUrl}/register/`, formdata)
}

export function loginUser(formdata) {
  return axios.post(`${baseUrl}/login/`, formdata)
}