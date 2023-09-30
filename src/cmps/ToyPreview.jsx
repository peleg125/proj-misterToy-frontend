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
      <span className={toy.inStock ? 'in-stock' : 'out-of-stock'}>{toy.inStock ? 'In stock!' : 'Out of stock!'}</span>
      <img src={robohashUrl} alt={`Robot representation for ${toy.name}`} />
      <div className='toy-name'>{toy.name}</div>
      <div>${toy.price.toLocaleString()}</div>
    </article>
  )
}
