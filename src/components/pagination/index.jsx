import React from 'react'
import propTypes from 'prop-types'
import { Button } from "react-bootstrap"

const Pagination = ({discounts, itemsPerPage, setItemsPerPage}) => {
  const handleLoadMore = () => {
    setItemsPerPage(itemsPerPage + 8)
  }

  return (
    <div className="d-flex justify-content-center">
      <Button
        variant="primary"
        onClick={handleLoadMore}
        className="mt-3"
        disabled={discounts.length <= itemsPerPage}
      >Load more</Button>
    </div>
  )
}

Pagination.propTypes = {
  discounts: propTypes.array,
  itemsPerPage: propTypes.number,
  setItemsPerPage: propTypes.func,
}

export default Pagination