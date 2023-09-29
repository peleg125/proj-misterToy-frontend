import { useNavigate } from 'react-router-dom'

export function ToyPreview({ toy }) {
  const robohashUrl = `https://robohash.org/${toy.name}?set=set2&size=150x150`

  const navigate = useNavigate()
  return (
    <article
      className='toy-preview'
      onClick={() => {
        navigate(`/toy/details/${toy._id}`)
      }}
    >
      <img src={robohashUrl} alt={`Robot representation for ${toy.name}`} />
      <div>Name - {toy.name}</div>
      <div>Price - ${toy.price.toLocaleString()}</div>
      <div>Date added -{new Date(toy.createdAt).toLocaleString()}</div>
    </article>
  )
}
