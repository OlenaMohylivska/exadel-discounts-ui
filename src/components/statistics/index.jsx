import React, { useState, useEffect, useContext } from "react"
import { Col, Container, Row, Button, FormControl } from "react-bootstrap"
import { Line, Bar, Doughnut, Pie } from "react-chartjs-2"
import axiosInstance from "components/api"
import FetchError from "components/fetch-error"
import "./styles.scss"
import { Context } from "store/context"
const chartColors = ["#2f1bb2", "#540d72", "#0bc1e1", "#ff0fa7", "#d349e2"]

const Statistics = () => {
  //responses
  const [discountsByOrders, setDiscountsByOrders] = useState({})
  const [discountsByViews, setDiscountsByViews] = useState({})
  const [companiesByOrders, setCompaniesByOrders] = useState({})
  const [categoriesByOrders, setCategoriesByOrders] = useState({})
  const [tagsByOrders, setTagsByOrders] = useState({})

  //charts
  const [discountsByOrdersChart, setDiscountsByOrdersChart] = useState({})
  const [discountsByViewsChart, setDiscountsByViewsChart] = useState({})
  const [companiesByOrdersChart, setCompaniesByOrdersChart] = useState({})
  const [categoriesByOrdersChart, setCategoriesByOrdersChart] = useState({})
  const [tagsByOrdersChart, setTagsByOrdersChart] = useState({})

  //error
  const [fetchError, setFetchError] = useState(null)


  //counters
  const [discountsByOrdersCounter, setDiscountsByOrdersCounter] = useState(5)
  const [discountsByViewsCounter, setDiscountsByViewsCounter] = useState(5)
  const [companiesByOrdersCounter, setCompaniesByOrdersCounter] = useState(3)
  const [categoriesByOrdersCounter, setCategoriesByOrdersCounter] = useState(3)
  const [tagsByOrdersCounter, setTagsByOrdersCounter] = useState(3)


  const { bindToken } = useContext(Context)
  useEffect(() => {
    bindToken()
  }, [])
/*eslint-disable*/
  const fetchData = async (url, setFunc) => {
    axiosInstance.get(url)
      .then((response) => setFunc(response.data))
      .catch((err) => setFetchError(err.message))
  }

  useEffect(() => {
    fetchData("/api/discounts/statistic/orders", setDiscountsByOrders)
    fetchData("/api/discounts/statistic/views", setDiscountsByViews)
    fetchData("/api/company/statistic/orders", setCompaniesByOrders)
    fetchData("/api/category/statistic/categories", setCategoriesByOrders)
    fetchData("/api/tags/statistic/orders", setTagsByOrders)
    console.log("SSS")
  }, [])

  /*1 */
  useEffect(() => {
    setDiscountsByOrdersChart({
      labels: Object.keys(discountsByOrders).slice(0, discountsByOrdersCounter),
      datasets: [
        {
          data: Object.values(discountsByOrders).slice(0, discountsByOrdersCounter),
          backgroundColor: "#1fbeff",
        },
      ],
    })
    console.log("SSS")
  }, [discountsByOrdersCounter])

  // discountsByOrders && useEffect(() => {
  //       setDiscountsByOrders({
  //         labels: discountsByOrders.labels.slice(0, discountsByOrdersCounter),
  //         datasets: [
  //           {
  //             data: discountsByOrders.datasets.data.slice(0, discountsByOrdersCounter),
  //             backgroundColor: "#1fbeff",
  //           },
  //         ],
  //       })
  // }, [discountsByOrdersCounter])

  const discountsByOrdersOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        onClick: () => { },
        display: false
      },
    },
  }

  /*2 */
  useEffect(() => {
    setDiscountsByViewsChart({
      labels: Object.keys(discountsByViews).slice(0, discountsByViewsCounter),
      datasets: [
        {
          data: Object.values(discountsByViews).slice(0, discountsByViewsCounter),
          backgroundColor: "#1fbeff",
        },
      ],
    })
  }, [discountsByViewsCounter])

  const discountsByViewsOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        onClick: () => { },
        display: false
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
    setCompaniesByOrdersChart({
      labels: Object.keys(companiesByOrders).slice(0, companiesByOrdersCounter),
      datasets: [
        {
          data: Object.values(companiesByOrders).slice(0, companiesByOrdersCounter),
          backgroundColor: chartColors,
        },
      ],
    })
  }, [companiesByOrdersCounter])


  // useEffect(() => {
  //   axiosInstance
  //     .get(baseUrl + "/api/company/statistic/orders")
  //     .then((response) => {
  //       setCompaniesByOrders({
  //         labels: Object.keys(response.data).slice(0, companiesByOrdersCounter),
  //         datasets: [
  //           {
  //             data: Object.values(response.data).slice(0, companiesByOrdersCounter),
  //             backgroundColor: ["#2f1bb2", "#540d72", "#0bc1e1", "#ff0fa7", "#d349e2"],
  //           },
  //         ],
  //       })
  //     })
  //     .catch((err) => setFetchError(err.message))
  // }, [])

  /*4 */
  useEffect(() => {
    setCategoriesByOrdersChart({
      labels: Object.keys(categoriesByOrders).slice(0, categoriesByOrdersCounter),
      datasets: [
        {
          data: Object.values(categoriesByOrders).slice(0, categoriesByOrdersCounter),
          backgroundColor: chartColors,
        },
      ],
    })
  }, [categoriesByOrdersCounter])


  // useEffect(() => {
  //   axiosInstance
  //     .get(baseUrl + "/api/category/statistic/categories")
  //     .then((response) => {
  //       setCategoriesByOrders({
  //         labels: Object.keys(response.data).slice(0, categoriesByOrdersCounter),
  //         datasets: [
  //           {
  //             data: Object.values(response.data).slice(0, categoriesByOrdersCounter),
  //             backgroundColor: ["#2f1bb2", "#540d72", "#0bc1e1", "#d349e2", "#ff0fa7"],
  //           },
  //         ],
  //       })
  //     })
  //     .catch((err) => setFetchError(err.message))
  // }, [])

  /*5 */
  // useEffect(() => {
  //   axiosInstance
  //     .get(baseUrl + "/api/tags/statistic/orders")
  //     .then((response) => {
  //       setTagsByOrders({
  //         labels: Object.keys(response.data).slice(0, tagsByOrdersCounter),
  //         datasets: [
  //           {
  //             data: Object.values(response.data).slice(0, tagsByOrdersCounter),
  //             backgroundColor: ["#2f1bb2", "#540d72", "#0bc1e1", "#d349e2", "#ff0fa7"],
  //           },
  //         ],
  //       })
  //     })
  //     .catch((err) => setFetchError(err.message))
  // }, [])

  useEffect(() => {
    setTagsByOrdersChart({
      labels: Object.keys(tagsByOrders).slice(0, tagsByOrdersCounter),
      datasets: [
        {
          data: Object.values(tagsByOrders).slice(0, tagsByOrdersCounter),
          backgroundColor: chartColors,
        },
      ],
    })
  }, [tagsByOrdersCounter])

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
              <p className="text-center mb-3 font-size-14">
                How many orders were done (by discounts)
              </p>
              <FormControl
                type="number"
                min={0}
                value={discountsByOrdersCounter}
                onChange={e => setDiscountsByOrdersCounter(e.target.value)}
              />
              <div>
                <Bar
                  data={discountsByOrdersChart}
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
              <p className="text-center mb-3 font-size-14">
                How many views each proposition has (by discounts)
              </p>
              <FormControl
                type="number"
                min={0}
                value={discountsByViewsCounter}
                onChange={e => setDiscountsByViewsCounter(e.target.value)}
              />
              <div>
                <Line
                  data={discountsByViewsChart}
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
              <FormControl
                type="number"
                min={0}
                value={companiesByOrdersCounter}
                onChange={e => setCompaniesByOrdersCounter(e.target.value)}
              />
              <div>
                <Doughnut
                  data={companiesByOrdersChart}
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
              <FormControl
                type="number"
                min={0}
                value={categoriesByOrdersCounter}
                onChange={e => setCategoriesByOrdersCounter(e.target.value)}
              />
              <div>
                <Pie
                  data={categoriesByOrdersChart}
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
              <FormControl
                type="number"
                min={0}
                value={tagsByOrdersCounter}
                onChange={e => setTagsByOrdersCounter(e.target.value)}
              />
              <div>
                <Pie
                  data={tagsByOrdersChart}
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
