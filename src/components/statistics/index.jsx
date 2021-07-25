import React, { useState, useEffect, useContext } from "react"
import { Col, Container, Row, Button } from "react-bootstrap"
import { Line, Bar, Doughnut, Pie } from "react-chartjs-2"
import axiosInstance from "components/api"
import FetchError from "components/fetch-error"
import "./styles.scss"
import { Context } from "store/context"
const baseUrl = process.env.REACT_APP_BASE_BACKEND_URL
const Statistics = () => {
  const [discountsByOrders, setDiscountsByOrders] = useState({})
  const [discountsByViews, setDiscountsByViews] = useState({})
  const [companiesByOrders, setCompaniesByOrders] = useState({})
  const [tagsByOrders, setTagsByOrders] = useState({})
  const [categoriesByOrders, setCategoriesByOrders] = useState({})
  const [fetchError, setFetchError] = useState(null)
  const { bindToken } = useContext(Context)
  useEffect(() => {
    bindToken()
  }, [])
  /*1 */
  useEffect(() => {
    axiosInstance
      .get(baseUrl + "/api/discounts/statistic/orders")
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

  /*2 */
  useEffect(() => {
    axiosInstance
      .get(baseUrl + "/api/discounts/statistic/views")
      .then((response) => {
        setDiscountsByViews({
          labels: Object.keys(response.data).slice(0,8),
          datasets: [
            {
              label: " How many views each proposition has (by discounts)",
              data: Object.values(response.data).slice(0,8),
              backgroundColor: "#1fbeff",
              borderColor: "#c728f6",
            },
          ],
        })
      })
      .catch((err) => setFetchError(err.message))
  }, [])

  const discountsByViewsOptions = {
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

  /*3 */
  useEffect(() => {
    axiosInstance
      .get(baseUrl + "/api/company/statistic/orders")
      .then((response) => {
        setCompaniesByOrders({
          labels: Object.keys(response.data),
          datasets: [
            {
              data: Object.values(response.data),
              backgroundColor: ["#2f1bb2", "#540d72", "#0bc1e1", "#ff0fa7", "#d349e2" ],
            },
          ],
        })
      })
      .catch((err) => setFetchError(err.message))
  }, [])

  /*4 */
  useEffect(() => {
    axiosInstance
      .get(baseUrl + "/api/category/statistic/categories")
      .then((response) => {
        setCategoriesByOrders({
          labels: Object.keys(response.data),
          datasets: [
            {
              data: Object.values(response.data),
              backgroundColor: ["#2f1bb2", "#540d72", "#0bc1e1", "#d349e2", "#ff0fa7"],
            },
          ],
        })
      })
      .catch((err) => setFetchError(err.message))
  }, [])

  /*5 */
  useEffect(() => {
    axiosInstance
      .get(baseUrl + "/api/tags/statistic/orders")
      .then((response) => {
        setTagsByOrders({
          labels: Object.keys(response.data),
          datasets: [
            {
              data: Object.values(response.data),
              backgroundColor: ["#2f1bb2", "#540d72", "#0bc1e1", "#d349e2", "#ff0fa7"],
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

  const downloadStatistics = (apiUrl, name) => {
    axiosInstance
      .get(apiUrl, {
        responseType: "blob",
      })
      .then((response) => {
        const url = URL.createObjectURL(response.data)
        const link = document.createElement("a")
        link.href = url
        link.setAttribute("download", name)
        document.body.appendChild(link)
        link.click()
      })
      .catch((err) => setFetchError(err.message))
  }

  return (
    <>
      {fetchError && <FetchError error={fetchError} />}
      {!fetchError && (
        <Container>
          <Row className="my-4">
            <Col>
              <div>
                <Bar
                  data={discountsByOrders}
                  height={300}
                  options={discountsByOrdersOptions}
                />
              </div>

              <div className="statistics-btn-area">
                <Button
                  onClick={() => {
                    downloadStatistics(
                      "/api/discounts/statistic/downloadXLSXOrdersByDiscounts",
                      "OrdersByDiscounts.xlsx"
                    )
                  }}
                >
                  Download XLSX
                </Button>
                <Button
                  onClick={() => {
                    downloadStatistics(
                      "/api/discounts/statistic/downloadCSVOrdersByDiscounts",
                      "OrdersByDiscounts.csv"
                    )
                  }}
                >
                  Download CSV
                </Button>
              </div>
            </Col>

            <Col>
              <div>
                <Line
                  data={discountsByViews}
                  height={300}
                  options={discountsByViewsOptions}
                />
              </div>
              <div className="statistics-btn-area">
                <Button
                  onClick={() => {
                    downloadStatistics(
                      "/api/discounts/statistic/downloadXLSXViewsByDiscounts",
                      "ViewsByDiscounts.xlsx"
                    )
                  }}
                >
                  Download XLSX
                </Button>
                <Button
                  onClick={() => {
                    downloadStatistics(
                      "/api/discounts/statistic/downloadCSVViewsByDiscounts",
                      "ViewsByDiscounts.csv"
                    )
                  }}
                >
                  Download CSV
                </Button>
              </div>
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
              <div className="statistics-btn-area">
                <Button
                  onClick={() => {
                    downloadStatistics(
                      "/api/company/statistic/downloadXLSXOrdersByCompanies",
                      "OrdersByCompanies.xlsx"
                    )
                  }}
                >
                  Download XLSX
                </Button>
                <Button
                  onClick={() => {
                    downloadStatistics(
                      "/api/company/statistic/downloadCSVOrdersByCompanies",
                      "OrdersByCompanies.csv"
                    )
                  }}
                >
                  Download CSV
                </Button>
              </div>
            </Col>
            <Col>
              <p className="text-center mb-3 font-size-14">
                How many orders were done(By categories)
              </p>
              <div>
                <Pie
                  data={categoriesByOrders}
                  height={250}
                  options={roundChartsOptions}
                />
              </div>
              <div className="statistics-btn-area">
                <Button
                  onClick={() => {
                    downloadStatistics(
                      "/api/category/statistic/downloadXLSXOrdersByCategories",
                      "OrdersByCategories.xlsx"
                    )
                  }}
                >
                  Download XLSX
                </Button>
                <Button
                  onClick={() => {
                    downloadStatistics(
                      "/api/category/statistic/downloadCSVOrdersByCategories",
                      "OrdersByCategories.csv"
                    )
                  }}
                >
                  Download CSV
                </Button>
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
              <div className="statistics-btn-area">
                <Button
                  onClick={() => {
                    downloadStatistics(
                      "/api/tags/statistic/downloadXLSXOrdersByTag",
                      "OrdersByTag.xlsx"
                    )
                  }}
                >
                  Download XLSX
                </Button>
                <Button
                  onClick={() => {
                    downloadStatistics(
                      "/api/tags/statistic/downloadCSVOrdersByTag",
                      "OrdersByTag.csv"
                    )
                  }}
                >
                  Download CSV
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      )}
    </>
  )
}

export default Statistics
