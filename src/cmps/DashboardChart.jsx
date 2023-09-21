import React, { useEffect } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, RadialLinearScale } from 'chart.js'
import { Doughnut, PolarArea, Line } from 'react-chartjs-2'
import { useSelector } from 'react-redux'
import { loadToy } from '../store/actions/toy.actions.js'
ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend)

export function MyChart() {
  const toys = useSelector((storeState) => storeState.toyModule.toys)

  useEffect(() => {
    loadToy().catch((err) => {
      console.log('err:', err)
    })
  }, [])

  const toyNames = toys.map((toy) => toy.name)
  const toyCount = toyNames.map((toyName) => toys.filter((toy) => toy.name === toyName).length)
  const toyPrice = toys.map((toy) => toy.price)

  const toyLabels = toys.filter((toy) => toy.labels && toy.labels.length).setMap((toy) => toy.labels)

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

  // const lineData = {
  //   labels,
  //   datasets: [
  //     {
  //       label: 'price per label',
  //       data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
  //       borderColor: 'rgb(255, 99, 132)',
  //       backgroundColor: 'rgba(255, 99, 132, 0.5)',
  //     },
  //     {
  //       label: 'date',
  //       data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
  //       borderColor: 'rgb(53, 162, 235)',
  //       backgroundColor: 'rgba(53, 162, 235, 0.5)',
  //     },
  //   ],
  // }
  //   const data = {
  //     labels: toyNames,
  //     datasets: [
  //       {
  //         label: '# of Votes',
  //         data: [12, 19, 3, 5, 2, 3],
  //         backgroundColor: [
  //           'rgba(255, 99, 132, 0.2)',
  //           'rgba(54, 162, 235, 0.2)',
  //           'rgba(255, 206, 86, 0.2)',
  //           'rgba(75, 192, 192, 0.2)',
  //           'rgba(153, 102, 255, 0.2)',
  //           'rgba(255, 159, 64, 0.2)',
  //         ],
  //         borderColor: [
  //           'rgba(255, 99, 132, 1)',
  //           'rgba(54, 162, 235, 1)',
  //           'rgba(255, 206, 86, 1)',
  //           'rgba(75, 192, 192, 1)',
  //           'rgba(153, 102, 255, 1)',
  //           'rgba(255, 159, 64, 1)',
  //         ],
  //         borderWidth: 1,
  //       },
  //     ],
  //   }

  return (
    <section style={{ maxWidth: '30vw', margin: 'auto' }}>
      <Doughnut data={data} />
    </section>
  )
}
