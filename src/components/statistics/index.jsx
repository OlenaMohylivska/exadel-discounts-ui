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
  const [discountsByOrders, setDiscountsByOrders] = useState(null)
  const [discountsByViews, setDiscountsByViews] = useState(null)
  const [companiesByOrders, setCompaniesByOrders] = useState(null)
  const [categoriesByOrders, setCategoriesByOrders] = useState(null)
  const [tagsByOrders, setTagsByOrders] = useState(null)

  //error
  const [fetchError, setFetchError] = useState(null)

  //counters
  const [discountsByOrdersCounter, setDiscountsByOrdersCounter] = useState(5)
  const [discountsByViewsCounter, setDiscountsByViewsCounter] = useState(5)
  const [companiesByOrdersCounter, setCompaniesByOrdersCounter] = useState(3)
  const [categoriesByOrdersCounter, setCategoriesByOrdersCounter] = useState(3)
  const [tagsByOrdersCounter, setTagsByOrdersCounter] = useState(3)

  const chartDefaultColor = "#1fbeff"
  const chartDefaultOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: false
  }

  const { bindToken } = useContext(Context)
  useEffect(() => {
    bindToken()
  }, [])

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
  }, [])

  const getChartData = (data, entriesLimit = 5, colors = chartDefaultColor) => {
    if(!data) return {}
    return {
      labels: Object.keys(data).slice(0, entriesLimit),
      datasets: [
        {
          data: Object.values(data).slice(0, entriesLimit),
          backgroundColor: colors,
        },
      ],
    }
  }

  const discountsOrdersChartData = getChartData({...discountsByOrders}, discountsByOrdersCounter)
  const discountsViewsChartData = getChartData(discountsByViews, discountsByViewsCounter)
  const companiesPopularityChart = getChartData(companiesByOrders, companiesByOrdersCounter, chartColors)
  const categoriesPopularityChart = getChartData(categoriesByOrders, categoriesByOrdersCounter, chartColors)
  const tagsPopularityChart = getChartData(tagsByOrders, tagsByOrdersCounter, chartColors)

  const discountsByOrdersOptions = {
    ...chartDefaultOptions,
    plugins: {
      legend: {
        display: false
      },
    },
  }

  const discountsByViewsOptions = {
    ...chartDefaultOptions,
    plugins: {
      legend: {
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

  const roundChartsOptions = {
    ...chartDefaultOptions,
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
                min={1}
                max={Object.keys(discountsByOrders || {}).length}
                value={discountsByOrdersCounter}
                onChange={e => setDiscountsByOrdersCounter(e.target.value)}
              />
              <div>
                <Bar
                  data={discountsOrdersChartData}
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
                min={1}
                max={Object.keys(discountsByViews || {}).length}
                value={discountsByViewsCounter}
                onChange={e => setDiscountsByViewsCounter(e.target.value)}
              />
              <div>
                <Line
                  data={discountsViewsChartData}
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
                min={1}
                max={Object.keys(companiesByOrders || {}).length}
                value={companiesByOrdersCounter}
                onChange={e => setCompaniesByOrdersCounter(e.target.value)}
              />
              <div>
                <Doughnut
                  data={companiesPopularityChart}
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
                min={1}
                max={Object.keys(categoriesByOrders || {}).length}
                value={categoriesByOrdersCounter}
                onChange={e => setCategoriesByOrdersCounter(e.target.value)}
              />
              <div>
                <Pie
                  data={categoriesPopularityChart}
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
                min={1}
                max={Object.keys(tagsByOrders || {}).length}
                value={tagsByOrdersCounter}
                onChange={e => setTagsByOrdersCounter(e.target.value)}
              />
              <div>
                <Pie
                  data={tagsPopularityChart}
                  height={250}s
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
