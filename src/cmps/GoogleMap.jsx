import React, { useEffect, useState } from 'react'
import GoogleMapReact from 'google-map-react'
import { httpService } from '../services/http.service.js'

// const AnyReactComponent = ({ text }) => {<div>{text}</div>}

function AnyReactComponent({ text }) {
  return (
    <section className='markers'>
      <div>{text}</div>
    </section>
  )
}

function SetStoreButtons({ lat, lng, name, onSetCoordinates }) {
  function handleClick() {
    onSetCoordinates({ lat, lng })
  }

  return (
    <div>
      <button onClick={handleClick} type='button'>
        {name}
      </button>
    </div>
  )
}

export function GoogleMap() {
  const [api, setApi] = useState(null)

  useEffect(() => {
    getGoogleApiKey().then((key) => {
      setApi(key)
    })
  }, [])

  const storesMarkers = [
    {
      name: 'Haifa',
      lat: 32.794,
      lng: 34.9896,
    },
    {
      name: 'Hertzliya',
      lat: 32.1378,
      lng: 34.8403,
    },
    {
      name: 'Ramat Hasharon',
      lat: 32.1624,
      lng: 34.8447,
    },
  ]

  const [coordinates, setCoordinates] = useState({ lat: 32.0853, lng: 34.7818 })
  const [markers, setMarkers] = useState(storesMarkers)
  const zoom = 11

  function handleClick({ lat, lng }) {
    setCoordinates({ lat, lng })
  }
  function getGoogleApiKey() {
    return httpService.get('getconfig').then((config) => {
      return Promise.resolve(config.apiKey)
    })
  }

  if (!api) return <div>loading..</div>
  return (
    <div style={{ height: '50vh', width: '100%' }}>
      <GoogleMapReact bootstrapURLKeys={{ key: api }} center={coordinates} defaultZoom={zoom} onClick={handleClick}>
        {markers.map((marker, idx) => (
          <AnyReactComponent key={idx} lat={marker.lat} lng={marker.lng} text='🏬' />
        ))}
      </GoogleMapReact>

      <div className='store-btn'>
        {markers.map((marker, idx) => (
          <SetStoreButtons key={idx} lat={marker.lat} lng={marker.lng} name={marker.name} onSetCoordinates={setCoordinates} />
        ))}
      </div>
    </div>
  )
}
