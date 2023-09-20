import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
const labels = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle', 'Outdoor', 'Battery Powered']

const STORAGE_KEY = 'toyDB'

export const toyService = {
  query,
  getById,
  save,
  remove,
  getEmptyToy,
  getDefaultFilter,
  getDefaultSort,
}

function query(filterBy = {}, sortBy) {
  return storageService.query(STORAGE_KEY).then((toys) => {
    let filteredToys = toys

    if (filterBy.name) {
      const regExp = new RegExp(filterBy.name, 'i')
      filteredToys = filteredToys.filter((toy) => regExp.test(toy.name))
    }

    if (filterBy.inStock !== undefined) {
      filteredToys = filteredToys.filter((toy) => toy.inStock === filterBy.inStock)
    }

    if (filterBy.labels && filterBy.labels.length > 0) {
      filteredToys = filteredToys.filter((toy) => filterBy.labels.some((label) => toy.labels.includes(label)))
    }

    filteredToys = utilService.getSortedToys(filteredToys, sortBy)

    return filteredToys
  })
}

function getById(toyId) {
  return storageService.get(STORAGE_KEY, toyId)
}

function remove(toyId) {
  return storageService.remove(STORAGE_KEY, toyId)
}

function save(toy) {
  if (toy._id) {
    return storageService.put(STORAGE_KEY, toy)
  } else {
    return storageService.post(STORAGE_KEY, toy)
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

function _createToys() {
  let toys = utilService.loadFromStorage(STORAGE_KEY)

  if (!toys || !toys.length) {
    const toys = [
      {
        _id: 't101',
        name: 'Talking Doll',
        price: 123,
        labels: ['Doll', 'Battery Powered', 'Baby'],
        createdAt: 1631031801011,
        inStock: true,
      },
      {
        _id: utilService.makeId(),
        name: 'Racing Car',
        price: 50,
        labels: randomLabels(labels, 1, 3),
        createdAt: 1635131801011,
        inStock: true,
      },
      {
        _id: utilService.makeId(),
        name: 'Art Kit',
        price: 70,
        labels: randomLabels(labels, 1, 3),
        createdAt: 1638231809017,
        inStock: false,
      },
      {
        _id: utilService.makeId(),
        name: 'Jigsaw Puzzle',
        price: 20,
        labels: randomLabels(labels, 1, 3),
        createdAt: 1632331804311,
        inStock: true,
      },
      {
        _id: utilService.makeId(),
        name: 'Baby Stroller',
        price: 110,
        labels: randomLabels(labels, 1, 3),
        createdAt: 1632934821021,
        inStock: false,
      },
      {
        _id: utilService.makeId(),
        name: 'Remote Helicopter',
        price: 99,
        labels: randomLabels(labels, 1, 3),
        createdAt: 1634231809876,
        inStock: true,
      },
      {
        _id: utilService.makeId(),
        name: 'Outdoor Slide',
        price: 150,
        labels: randomLabels(labels, 1, 3),
        createdAt: 1631531807523,
        inStock: true,
      },
    ]

    utilService.saveToStorage(STORAGE_KEY, toys)
  }
}
const randomLabels = (labels, min, max) => {
  const randomLength = Math.floor(Math.random() * (max - min + 1) + min)
  const shuffled = labels.sort(() => 0.5 - Math.random())
  return shuffled.slice(0, randomLength)
}

_createToys()
