// import { storageService } from './async-storage.service.js'
import { httpService } from './http.service.js'
import { utilService } from './util.service.js'

const STORAGE_KEY = 'toyDB'
const BASE_URL = 'toy/'
const labels = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle', 'Outdoor', 'Battery Powered']

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
  // return storageService.get(STORAGE_KEY, toyId)
}

function remove(toyId) {
  return httpService.delete(BASE_URL + toyId)
  // return storageService.remove(STORAGE_KEY, toyId)
}

function save(toy) {
  if (toy._id) {
    return httpService.put(BASE_URL, toy)
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

const randomLabels = (labels, min, max) => {
  const randomLength = Math.floor(Math.random() * (max - min + 1) + min)
  const shuffled = labels.sort(() => 0.5 - Math.random())
  return shuffled.slice(0, randomLength)
}

function getLabels() {
  return labels
}
