import { loadToy, setFilterBy } from '../store/actions/toy.actions.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { ToyList } from '../cmps/ToyList.jsx'
import { ToySort } from '../cmps/ToySort.jsx'
import { ToyFilter } from '../cmps/ToyFilter.jsx'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toyService } from '../services/toy.service.js'

export function ToyIndex() {
  const toys = useSelector((storeState) => storeState.toyModule.toys)
  const filterBy = useSelector((storeState) => storeState.toyModule.filterBy)
  const [sortBy, setSortBy] = useState(toyService.getDefaultSort)

  useEffect(() => {
    loadToy(sortBy).catch((err) => {
      console.log('err:', err)
      showErrorMsg('Cannot load toys')
    })
  }, [filterBy, sortBy])

  function onSetFilterBy(filterBy) {
    setFilterBy(filterBy)
  }

  return (
    <section className='toy-index'>
      <section className='toy-filter-sort'>
        <div className='add-toy-container'>
          <Link className='add-toy' to='/toy/edit'>
            Add Toy
          </Link>
        </div>
        {!toys.length && <div className='loading'>Loading...</div>}
        <ToyFilter onSetFilterBy={onSetFilterBy} filterBy={filterBy} />
        <ToySort sortBy={sortBy} setSortBy={setSortBy} />
      </section>
      {toys && <ToyList toys={toys} />}
    </section>
  )
}
