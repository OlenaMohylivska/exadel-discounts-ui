/*eslint-disable*/
import React, { useState, useEffect } from "react"
import { Col, Container, Row, Button } from "react-bootstrap"
import { Line, Bar, Doughnut, Pie } from "react-chartjs-2"
import axiosInstance from "components/api"
import FetchError from "components/fetch-error"
const baseUrl = process.env.REACT_APP_BASE_BACKEND_URL

const Statistics = () => {
  const [discountsByOrders, setDiscountsByOrders] = useState({})
  const [discountsByViews, setDiscountsByViews] = useState({})
  const [companiesByOrders, setCompaniesByOrders] = useState({})
  const [tagsByOrders, setTagsByOrders] = useState({})
  const [categoriesByOrders, setCategoriesByOrders] = useState({})
  const [fetchError, setFetchError] = useState(null)
  const [downloadLink, setDownloadLink] = useState("")
  const [fileName, setFileName] = useState()


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
        onClick: () => { },
      },
    },
  }

  /*2 */
  useEffect(() => {
    axiosInstance
      .get(baseUrl + "/api/discounts/statistic/views")
      .then((response) => {
        setDiscountsByViews({
          labels: Object.keys(response.data),
          datasets: [
            {
              label: " How many views each proposition has (by discounts)",
              data: Object.values(response.data),
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
        onClick: () => { },
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
      .get(baseUrl + "/api/tags/statistic/categories")
      .then((response) => {

        setCategoriesByOrders({
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


  const downloadStatisctics = (url) => {
    axiosInstance
      .get(url, {
        responseType: "blob"
      })
      .then(response => {
        setDownloadLink(URL.createObjectURL(response.data))
        console.log(downloadLink)
      }).catch((err) => setFetchError(err.message))
  }
  // useEffect(() => {
  //   downloadStatisctics("/api/discounts/statistic/downloadXLSXOrdersByDiscounts")
  // }, [])

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
            <Button >Download CSV</Button>
            <a href={downloadLink ?? ""} download="OrdersByDiscounts.xlsx" onClick={() => { downloadStatisctics("/api/discounts/statistic/downloadXLSXOrdersByDiscounts") }} >
              <Button >Download XLSX</Button>
            </a>
            <Col>
              <Line
                data={discountsByViews}
                height={300}
                options={discountsByViewsOptions}
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
                How many orders were done(By categories)
              </p>
              <div>
                <Pie
                  data={categoriesByOrders}
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
