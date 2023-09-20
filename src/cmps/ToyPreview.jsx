import { useNavigate } from 'react-router-dom'

export function ToyPreview({ toy }) {
  const navigate = useNavigate()
  return (
    <article
      className='toy-preview'
      onClick={() => {
        navigate(`/toy/details/${toy._id}`)
      }}
    >
      <div>Name - {toy.name}</div>
      <div>Price - ${toy.price.toLocaleString()}</div>
      <div>Date added -{new Date(toy.createdAt).toLocaleString()}</div>
    </article>
  )
}
