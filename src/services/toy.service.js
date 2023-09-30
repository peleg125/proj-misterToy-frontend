import { httpService } from './http.service.js'
import { utilService } from './util.service.js'

const STORAGE_KEY = 'toyDB'
const BASE_URL = 'toy/'
const labels = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle', 'Outdoor', 'Battery powered']

export const toyService = {
  query,
  getById,
  save,
  remove,
  getEmptyToy,
  getDefaultFilter,
  getDefaultSort,
  getLabels,
}

function query(filterBy = {}, sortBy) {
  const data = { ...filterBy, ...sortBy }
  return httpService.get(BASE_URL, data)
}

function getById(toyId) {
  return httpService.get(BASE_URL + toyId)
}

function remove(toyId) {
  return httpService.delete(BASE_URL + toyId)
}

function save(toy) {
  if (toy._id) {
    return httpService.put(`${BASE_URL}${toy._id}`, toy)
  } else {
    return httpService.post(BASE_URL, toy)
  }
}
function getDefaultSort() {
  return { type: '', desc: -1 }
}

function getDefaultFilter() {
  return { name: '', inStock: true, labels: [] }
}

function getEmptyToy() {
  return {
    _id: '',
    name: '',
    price: 0,
    labels: [],
    createdAt: Date.now(),
    inStock: true,
  }
}

function getLabels() {
  return labels
}
