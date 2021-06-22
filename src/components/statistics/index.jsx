import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Line, Bar, Doughnut, PolarArea } from 'react-chartjs-2'
const Statistics = () => {

  const companyOffersForWeekData = {
    labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    datasets: [
      {
        label: "How many discounts were used this week",
        data: [20, 60, 40, 37, 21, 73, 19],

        backgroundColor: "blue",
        borderColor: "purple",
      },
    ],
  }

  const companyOffersForWeekOptions = {
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

  const manyDiscountsForWeekData = {
    labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    datasets: [
      {
        label: "Cheap nikes",
        data: [20, 60, 40, 37, 21, 73, 19],

        backgroundColor: "blue",

      },
      {
        label: "Free pizza",
        data: [30, 15, 65, 11, 40, 19, 45],
        backgroundColor: "red",

      },
      {
        label: "Sth else",
        data: [44, 40, 20, 29, 66, 55, 30],
        backgroundColor: "green",
      }
    ],
  }

  const manyDiscountsForWeekOptions = {

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
  const discountsByQuantityData = {
    labels: ["Cheap Nikes", "-50% on Pizza", "Buy 2 pairs of shoes, get 3rd for free ", "Someth else"],
    datasets: [
      {
        label: "How many discounts were used by quantity",
        data: [20, 40, 37, 73],
        backgroundColor: ["blue", "red", "yellow", "green"],
      },
    ],
  }

  const discountsByRatingData = {
    labels: ["Cheap Nikes", "-50% on Pizza", "Buy 2 pairs of shoes, get 3rd for free "],
    datasets: [
      {
        label: ' ',
        data: [20, 40, 37],
        backgroundColor: ["rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)"],
      },
    ],
  }

  return (
    <Container>
      <Row className="my-5">
        <Col>

          <Line data={companyOffersForWeekData} options={companyOffersForWeekOptions} />
        </Col>
        <Col>
          <Bar data={manyDiscountsForWeekData} options={manyDiscountsForWeekOptions} />
        </Col>
      </Row>
      <Row>
        <Col>
          <Doughnut data={discountsByQuantityData} />
        </Col>
        <Col>
          <PolarArea data={discountsByRatingData} />
        </Col>
      </Row>

    </Container>
  )
}

export default Statistics