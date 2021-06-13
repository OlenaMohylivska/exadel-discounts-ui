import React from 'react'
import "./styles.css"
import PropTypes from 'prop-types'

const Error = ({ error }) => {
  return (
    <div className="error">
      {error}
    </div>
  )
}

export default Error

Error.propTypes = {
  error: PropTypes.string
}