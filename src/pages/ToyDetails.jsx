// const { useState, useEffect } = React
// const { useParams, useNavigate } = ReactRouterDOM
// import { toyService } from '../services/toy.service.js'
// import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
// import { removeToy } from '../store/actions/toy.actions.js'

import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { removeToy } from '../store/actions/toy.actions'
import { toyService } from '../services/toy.service'

export function ToyDetails() {
  const params = useParams()
  const navigate = useNavigate()

  const [currToy, setCurrToy] = useState(null)

  useEffect(() => {
    toyService
      .getById(params.toyId)
      .then((toy) => {
        if (!toy) return navigate('/toy')
        setCurrToy(toy)
      })
      .catch((err) => {
        console.log('Had issues loading toy', err)
      })
  }, [])

  function onRemoveToy() {
    removeToy(params.toyId)
      .then(() => {
        showSuccessMsg('Toy removed')
        navigate('/toy')
      })
      .catch((err) => {
        console.log('Cannot remove toy', err)
        showErrorMsg('Cannot remove toy')
      })
  }

  if (!currToy) return <h4>loading</h4>
  const { _id, name, price, labels, createdAt, inStock } = currToy

  return (
    <section className='toy-details'>
      <div className='toy-data-container'>
        <h1>Id: {_id}</h1>
        <h1>Name: {name}</h1>
        <h1>price: {price}</h1>
        <h2>labels: {labels.join(', ')}</h2>
        <h2>Date added - {new Date(createdAt).toLocaleString()}</h2>
        <h2>inStock: {inStock ? 'Yes!' : 'Sadly not :('}</h2>
        <div className='form-btns'>
          <button className='del-btn' onClick={() => onRemoveToy()}>
            Delete Toy
          </button>
          <button className='back-btn' onClick={() => navigate('/toy')}>
            Back to toys
          </button>
          <button
            className='nav-edit-btn'
            onClick={() => {
              navigate(`/toy/edit/${params.toyId}`)
            }}
          >
            Edit
          </button>
        </div>
      </div>
    </section>
  )
}