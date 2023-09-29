import { toyService } from '../services/toy.service.js'
import { showErrorMsg } from '../services/event-bus.service.js'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export function ToyEdit() {
  const [toyToEdit, setToyToEdit] = useState(toyService.getEmptyToy())
  const navigate = useNavigate()
  const params = useParams()

  useEffect(() => {
    const fetchToy = async () => {
      try {
        const toy = await toyService.getById(params.toyId)
        if (!toy) {
          navigate('/toy')
        } else {
          setToyToEdit(toy)
        }
      } catch (err) {
        console.log('Had issues loading toy', err)
      }
    }

    fetchToy()
  }, [params.toyId])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    const finalValue = type === 'checkbox' ? checked : value
    setToyToEdit({
      ...toyToEdit,
      [name]: finalValue,
    })
  }
  const handleMultiSelectChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map((option) => option.value)
    setToyToEdit({
      ...toyToEdit,
      labels: selectedOptions,
    })
  }
  async function onSaveToy(ev) {
    ev.preventDefault()
    try {
      await toyService.save(toyToEdit)
      navigate('/toy')
    } catch (err) {
      showErrorMsg('Cannot save toy', err)
    }
  }

  const { name, price, labels, createdAt, inStock } = toyToEdit
  return (
    <section className='toy-edit'>
      <h2>Edit Toy</h2>
      <form onSubmit={onSaveToy}>
        <div>
          <label>Name</label>
          <input type='text' name='name' value={name} onChange={handleChange} />
        </div>
        <div>
          <label>Price</label>
          <input type='number' name='price' value={price} onChange={handleChange} />
        </div>
        <div>
          <label>Labels</label>
          <select multiple={true} value={labels || []} onChange={handleMultiSelectChange}>
            <option value='Educational'>Educational</option>
            <option value='Fun'>Fun</option>
            <option value='Outdoor'>Outdoor</option>
            <option value='Indoor'>Indoor</option>
          </select>
        </div>
        <div>
          <label>Created At</label>
          <input type='text' disabled value={new Date(createdAt).toLocaleString()} />
        </div>
        <div>
          <label>In Stock</label>
          <input type='checkbox' name='inStock' checked={inStock} onChange={handleChange} />
        </div>
        <button type='submit'>{params.toyId ? 'Update' : 'Add'} Toy</button>
      </form>
    </section>
  )
}
