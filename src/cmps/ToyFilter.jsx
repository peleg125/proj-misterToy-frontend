import { useEffect, useRef, useState } from 'react'
import { utilService } from '../services/util.service.js'
import { SelectFilter } from './SelectFilter.jsx'
import { toyService } from '../services/toy.service.js'

export function ToyFilter({ filterBy, onSetFilterBy }) {
  const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })

  const debouncedOnSetFilterBy = useRef(utilService.debounce(onSetFilterBy))

  const labelsToChoose = toyService.getLabels()

  useEffect(() => {
    debouncedOnSetFilterBy.current(filterByToEdit)
  }, [filterByToEdit])

  function handleChange({ target }) {
    const field = target.name

    let value
    if (target.type === 'checkbox') {
      value = target.checked
    } else if (target.type === 'select-one') {
      if (target.value === '1') {
        value = true
      } else if (target.value === '0') {
        value = false
      } else {
        value = null
      }
    } else {
      value = target.value
    }

    setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
  }

  function handleMultiSelectChange(newValue) {
    setFilterByToEdit((prevFilter) => ({
      ...prevFilter,
      labels: newValue,
    }))
  }

  const { name, inStock, labels } = filterByToEdit

  return (
    <section className='toy-filter'>
      <form className='form-container'>
        <input onChange={handleChange} value={name} type='text' placeholder='Search by Name' name='name' />
        <label>
          Stock Status:
          <select name='inStock' value={inStock === null ? '' : inStock ? '1' : '0'} onChange={handleChange}>
            <option value=''>All</option>
            <option value='1'>In stock</option>
            <option value='0'>Out of stock</option>
          </select>
        </label>
        <SelectFilter labels={labelsToChoose} selectedLabels={labels} onLabelChange={handleMultiSelectChange} />
      </form>
    </section>
  )
}
