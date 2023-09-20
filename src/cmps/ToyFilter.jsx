import { useEffect, useRef, useState } from 'react'
import { utilService } from '../services/util.service.js'

export function ToyFilter({ filterBy, onSetFilterBy }) {
  const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })

  const debouncedOnSetFilterBy = useRef(utilService.debounce(onSetFilterBy))

  useEffect(() => {
    debouncedOnSetFilterBy.current(filterByToEdit)
  }, [filterByToEdit])

  function handleChange({ target }) {
    const field = target.name
    let value = target.type === 'checkbox' ? target.checked : target.value
    setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
  }

  function handleMultiSelectChange(e) {
    setFilterByToEdit((prevFilter) => ({
      ...prevFilter,
      labels: Array.from(e.target.selectedOptions, (option) => option.value),
    }))
  }

  const { name, inStock, labels } = filterByToEdit

  console.log('name', name)
  console.log('inStock', inStock)
  console.log('labels', labels)
  return (
    <section className='toy-filter'>
      <form>
        <div className='filter-input-wrapper'>
          <input onChange={handleChange} value={name} type='text' placeholder='Search by Name' name='name' />
          <label>
            <input type='checkbox' name='inStock' checked={inStock} onChange={handleChange} />
            In Stock
          </label>
          <select multiple={true} value={labels} onChange={handleMultiSelectChange}>
            <option value='On wheels'>On wheels</option>
            <option value='Box game'>Box game</option>
            <option value='Baby'>Baby</option>
            <option value='Doll'>Doll</option>
            <option value='Puzzle'>Puzzle</option>
            <option value='Outdoor'>Outdoor</option>
            <option value='Battery Powered'>Battery Powered</option>
          </select>
        </div>
      </form>
    </section>
  )
}
