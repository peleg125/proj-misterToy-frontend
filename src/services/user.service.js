import { storageService } from './async-storage.service.js'
import { httpService } from './http.service.js'

const BASE_URL = 'auth/'
const STORAGE_KEY = 'userDB'
const STORAGE_KEY_LOGGEDIN = 'loggedinUser'

export const userService = {
  login,
  logout,
  signup,
  getById,
  getLoggedinUser,
}

window.us = userService

function getById(userId) {
  return storageService.get(STORAGE_KEY, userId)
}

async function login({ username, password }) {
  const user = await httpService.post(BASE_URL + 'login', { username, password })
  if (user) return _setLoggedinUser(user)
}

async function signup({ username, password, fullname }) {
  const user = { username, password, fullname, score: 10000 }
  const user_1 = await httpService.post(BASE_URL + 'signup', user)
  if (user_1) return _setLoggedinUser(user_1)
}

async function logout() {
  await httpService.post(BASE_URL + 'logout')
  sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN)
}

function getLoggedinUser() {
  return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN))
}

function _setLoggedinUser(user) {
  const userToSave = { _id: user._id, fullname: user.fullname, score: user.score, isAdmin: user.isAdmin }
  sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(userToSave))
  return userToSave
}
