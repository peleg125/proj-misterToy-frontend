import { toyService } from '../../services/toy.service.js'
import { toyServiceLocal } from '../../services/toy.service.local.js'

import { ADD_TOY, SET_FILTER_BY, REMOVE_TOY, SET_TOYS, UPDATE_TOY } from '../reducers/toy.reducer.js'
import { store } from '../store.js'

export async function loadToy(sortBy) {
  const { filterBy } = store.getState().toyModule
  try {
    const toys = await toyService.query(filterBy, sortBy)
    store.dispatch({ type: SET_TOYS, toys })
  } catch (err) {
    console.log('toy action -> Cannot load toy', err)
    throw err
  }
}

export async function removeToy(toyId) {
  try {
    await toyService.remove(toyId)
    store.dispatch({ type: REMOVE_TOY, toyId })
  } catch (err) {
    console.log('toy action -> Cannot remove toy', err)
    throw err
  }
}

export async function saveToy(toy) {
  const type = toy._id ? UPDATE_TOY : ADD_TOY
  try {
    const toyToSave = await toyService.save(toy)
    store.dispatch({ type, toy: toyToSave })
    return toyToSave
  } catch (err) {
    console.log('toy action -> Cannot save toy', err)
    throw err
  }
}
export function setFilterBy(filterBy) {
  store.dispatch({ type: SET_FILTER_BY, filterBy: filterBy })
}
