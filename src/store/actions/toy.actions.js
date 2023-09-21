import { toyService } from '../../services/toy.service.js'
import {
  ADD_TOY,
  SET_FILTER_BY,
  REMOVE_TOY,
  SET_TOYS,
  UPDATE_TOY,
} from '../reducers/toy.reducer.js'
import { store } from '../store.js'

export function loadToy(sortBy) {
  const { filterBy } = store.getState().toyModule

  return toyService
    .query(filterBy, sortBy)
    .then((toys) => {
      store.dispatch({ type: SET_TOYS, toys })
    })
    .catch((err) => {
      console.log('toy action -> Cannot load toy', err)
      throw err
    })
}

export function removeToy(toyId) {
  return toyService
    .remove(toyId)
    .then(() => {
      store.dispatch({ type: REMOVE_TOY, toyId })
    })
    .catch((err) => {
      console.log('toy action -> Cannot remove toy', err)
      throw err
    })
}

export function saveToy(toy) {
  const type = toy._id ? UPDATE_TOY : ADD_TOY
  return toyService
    .save(toy)
    .then((toyToSave) => {
      store.dispatch({ type, toy: toyToSave })
      return toyToSave
    })
    .catch((err) => {
      console.log('toy action -> Cannot save toy', err)
      throw err
    })
}
export function setFilterBy(filterBy) {
  store.dispatch({ type: SET_FILTER_BY, filterBy: filterBy })
}
