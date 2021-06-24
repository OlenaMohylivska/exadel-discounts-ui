import React, { useState, useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Line, Bar, Doughnut, Pie } from 'react-chartjs-2'
import * as axios from 'axios'

const baseUrl = process.env.REACT_APP_BASE_BACKEND_URL
const Statistics = () => {

  const [allOrdersByRatingData, setAllOrdersByRatingData] = useState([])
  const [allOrdersByRating, setAllOrdersByRating] = useState({})
  const [allOrdersByCount, setAllOrdersByCount] = useState({})
  const [ordersOfEachCompany, setOrdersOfEachCompany] = useState({})

  /*1 */
  const ordersOfEachCompanyForWeek = {
    labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    datasets: [
      {
        label: "How many discounts were used this week",
        data: [20, 60, 40, 37, 21, 73, 19],

        backgroundColor: "#1fbeff",
        borderColor: "#c728f6",
      },
    ],
  }

  const ordersOfEachCompanyForWeekOptions = {
    plugins: {
      legend: {
        onClick: () => { }
      }
    },
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  }
  /*2 */
  useEffect(() => {
    axios.get(baseUrl + "/api/discounts/all")
      .then(response => {
        setAllOrdersByRatingData(response.data)
      })
  }, [])

  useEffect(() => {
    console.log(allOrdersByRatingData)
    setAllOrdersByRating({
      labels: ["Cheap Nikes", "Sushi", "Pizza", "Massage", "Sth else"],
      datasets: [
        {
          label: "All discounts by rating",
          data: [2.5, 4.33, 4.8, 3.9, 3],

          backgroundColor: "#1fbeff",
        },
      ],
    })
  }, [])

  const allOrdersByRatingOptions = {
    plugins: {
      legend: {
        onClick: () => { }
      }
    },

  }

  /*3 */
  useEffect(() => {
    setOrdersOfEachCompany({
      labels: ["Nike", "Dominos Pizza", "SportLife", "SPA"],
      datasets: [
        {
          data: [20, 60, 40, 37],

          backgroundColor: ["#2f1bb2", "#540d72", "#0bc1e1", "#d349e2"],
        },
      ],
    })
  }, [])

  /*4 */
  useEffect(() => {
    setAllOrdersByCount({
      labels: ["Cheap Nikes", "Sushi", "Pizza", "Massage", "Sth else"],
      datasets: [
        {

          data: [19, 44, 32, 70, 39],

          backgroundColor: ["#2f1bb2", "#540d72", "#0bc1e1", "#d349e2", "#ff00b3"],
        },
      ],
    })
  }, [])

  return (
    <Container>
      <Row className="my-5">
        <Col>
          <Line data={ordersOfEachCompanyForWeek} options={ordersOfEachCompanyForWeekOptions} />
        </Col>
        <Col>
          <Bar data={allOrdersByRating} options={allOrdersByRatingOptions} />
        </Col>
      </Row>
      <Row>
        <Col>
          <p className="text-center mb-3 font-size-14">How many orders each company has</p>
          <Doughnut data={ordersOfEachCompany} />
        </Col>
        <Col>
          <p className="text-center mb-3 font-size-14">How many discounts were bought(in general)</p>
          <Pie data={allOrdersByCount} />
        </Col>
      </Row>
    </Container>
  )
}

export default Statistics