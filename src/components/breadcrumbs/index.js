import React from "react"
import "./styles.scss"
import Breadcrumb from "react-bootstrap/Breadcrumb"
import { withRouter } from "react-router-dom"
import PropTypes from "prop-types"

const Breadcrumbs = (props) => {
  const {
    history,
    location: { pathname },
  } = props
  const pathnames = pathname.split("/").filter((x) => x)
  return (
    <div className="breadcrumbs-wrapper">
      <Breadcrumb>
        {pathnames.length > 0 ? (
          <Breadcrumb.Item href="/" onClick={() => history.push("/")}>
            Home
          </Breadcrumb.Item>
        ) : ""}
        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`
          const isLast = index === pathnames.length - 1
          return isLast ? (
            <Breadcrumb.Item
              active
              key={name}
              href="/"
              onClick={() => history.push(routeTo)}
            >
              {name}
            </Breadcrumb.Item>
          ) : (
            <Breadcrumb.Item
              key={name}
              href="/"
              onClick={() => history.push(routeTo)}
            >
              {name}
            </Breadcrumb.Item>
          )
        })}
      </Breadcrumb>
    </div>
  )
}

export default withRouter(Breadcrumbs)

Breadcrumbs.propTypes = {
  history: PropTypes.any.isRequired,
  location: PropTypes.any.isRequired,
}
