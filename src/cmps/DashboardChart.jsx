import React, { useEffect } from 'react'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  RadialLinearScale,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from 'chart.js'
import { Doughnut, Line } from 'react-chartjs-2'
import { useSelector } from 'react-redux'
import { loadToy } from '../store/actions/toy.actions.js'
import { toyService } from '../services/toy.service.js'

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement)

export function MyChart() {
  const toys = useSelector((storeState) => storeState.toyModule.toys)
  const labels = toyService.getLabels()
  useEffect(() => {
    loadToy().catch((err) => {
      console.log('err:', err)
    })
  }, [])

  const toyNames = toys.map((toy) => toy.name)
  const toyCount = toyNames.map((toyName) => toys.filter((toy) => toy.name === toyName).length)

  const toyPricePerLabel = averagePricePerLabel(toys, labels)

  const labelName = toyPricePerLabel.map((item) => item.label)
  const labelPrice = toyPricePerLabel.map((item) => item.averagePrice)

  function averagePricePerLabel(toys, labels) {
    return labels.map((label) => {
      const toysWithLabel = toys.filter((toy) => toy.labels.includes(label))
      const total = toysWithLabel.reduce((sum, toy) => sum + toy.price, 0)
      return {
        label,
        averagePrice: toysWithLabel.length > 0 ? total / toysWithLabel.length : 0,
      }
    })
  }
  const data = {
    labels: toyNames,
    datasets: [
      {
        label: '# of Toys',
        data: toyCount,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  }

  const lineData = {
    labels: labelName,
    datasets: [
      {
        label: 'price per label',
        data: labelPrice,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  }

  return (
    <section style={{ maxWidth: '30vw', margin: 'auto' }}>
      <Doughnut data={data} />
      <Line data={lineData} />
    </section>
  )
}
