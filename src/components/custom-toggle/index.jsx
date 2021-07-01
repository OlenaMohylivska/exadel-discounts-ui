import { useAccordionToggle } from "react-bootstrap"
import "./styles.css"
import React from "react"
import PropTypes from "prop-types"

function CustomToggle({ children, eventKey }) {
  const decoratedOnClick = useAccordionToggle(eventKey, () => {})

  return (
    <button type="button" className="button" onClick={decoratedOnClick}>
      {children}
    </button>
  )
}

export default CustomToggle

CustomToggle.propTypes = {
  children: PropTypes.string,
  eventKey: PropTypes.any,
}
