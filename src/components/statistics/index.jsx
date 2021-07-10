import React, { useState, useEffect } from "react"
import { Col, Container, Row } from "react-bootstrap"
import { Line, Bar, Doughnut, Pie } from "react-chartjs-2"

import axiosInstance from "components/api"
import FetchError from "components/fetch-error"

const baseUrl = process.env.REACT_APP_BASE_BACKEND_URL

const Statistics = () => {
  const [discountsByOrders, setDiscountsByOrders] = useState({})
  const [companiesByOrders, setCompaniesByOrders] = useState({})
  const [tagsByOrders, setTagsByOrders] = useState({})
  const [fetchError, setFetchError] = useState(null)

  const ordersOfEachCompanyForWeek = {
    labels: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    datasets: [
      {
        label: "How many discounts were used this week(test)",
        data: [20, 60, 40, 37, 21, 73, 19],

        backgroundColor: "#1fbeff",
        borderColor: "#c728f6",
      },
    ],
  }

  const ordersOfEachCompanyForWeekOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        onClick: () => {},
      },
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
    axiosInstance
      .get(baseUrl + "/api/discounts/statistic")
      .then((response) => {
        setDiscountsByOrders({
          labels: Object.keys(response.data),
          datasets: [
            {
              label: " How many orders were done (by discounts)",
              data: Object.values(response.data),
              backgroundColor: "#1fbeff",
            },
          ],
        })
      })
      .catch((err) => setFetchError(err.message))
  }, [])

  const discountsByOrdersOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        onClick: () => {},
      },
    },
  }

  /*3 */
  useEffect(() => {
    axiosInstance
      .get(baseUrl + "/api/company/statistic")
      .then((response) => {
        setCompaniesByOrders({
          labels: Object.keys(response.data),
          datasets: [
            {
              data: Object.values(response.data),
              backgroundColor: ["#2f1bb2", "#540d72", "#0bc1e1", "#d349e2"],
            },
          ],
        })
      })
      .catch((err) => setFetchError(err.message))
  }, [])

  /*4 */
  useEffect(() => {
    axiosInstance
      .get(baseUrl + "/api/tags/statistic")
      .then((response) => {
        setTagsByOrders({
          labels: Object.keys(response.data),
          datasets: [
            {
              data: Object.values(response.data),
              backgroundColor: ["#2f1bb2", "#540d72", "#0bc1e1", "#d349e2"],
            },
          ],
        })
      })
      .catch((err) => setFetchError(err.message))
  }, [])

  const roundChartsOptions = {
    responsive: true,
    maintainAspectRatio: false,
  }

  return (
    <>
      {fetchError && <FetchError error={fetchError} />}
      {!fetchError && (
        <Container>
          <Row className="my-4">
            <Col>
              <Bar
                data={discountsByOrders}
                height={300}
                options={discountsByOrdersOptions}
              />
            </Col>
            <Col>
              <Line
                data={ordersOfEachCompanyForWeek}
                height={300}
                options={ordersOfEachCompanyForWeekOptions}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <p className="text-center mb-3 font-size-14">
                How many orders were done(By companies)
              </p>
              <div>
                <Doughnut
                  data={companiesByOrders}
                  height={250}
                  options={roundChartsOptions}
                />
              </div>
            </Col>
            <Col>
              <p className="text-center mb-3 font-size-14">
                How many orders were done(By tags)
              </p>
              <div>
                <Pie
                  data={tagsByOrders}
                  height={250}
                  options={roundChartsOptions}
                />
              </div>
            </Col>
          </Row>
        </Container>
      )}
    </>
  )
}

export default Statistics
