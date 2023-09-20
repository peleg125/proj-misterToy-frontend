import { ToyPreview } from './ToyPreview.jsx'

export function ToyList({ toys }) {
  return (
    <ul className='toy-list'>
      {toys.map((toy) => (
        <ToyPreview key={toy._id} toy={toy} />
      ))}
    </ul>
  )
}
