import React from "react"
import propTypes from "prop-types"
import { Button } from "react-bootstrap"

const Pagination = ({
  discounts,
  itemsPerPage,
  setItemsPerPage,
  itemsPerFavoritePage,
  setItemsPerFavoritePage,
  favorites,
  isFavorite,
}) => {
  const handleLoadMore = () => {
    setItemsPerPage(itemsPerPage + 8)
  }

  const handleMoreFavorites = () => {
    setItemsPerFavoritePage(itemsPerFavoritePage + 6)
  }

  return (
    <div className="d-flex justify-content-center">
      <Button
        variant="primary"
        onClick={isFavorite ? handleMoreFavorites : handleLoadMore}
        className="mt-3"
        disabled={
          isFavorite
            ? favorites && favorites.length <= itemsPerFavoritePage
            : discounts && discounts.length <= itemsPerPage
        }
      >
        Load more
      </Button>
    </div>
  )
}

Pagination.propTypes = {
  discounts: propTypes.array,
  favorites: propTypes.array,
  itemsPerPage: propTypes.number,
  setItemsPerPage: propTypes.func,
  itemsPerFavoritePage: propTypes.number,
  setItemsPerFavoritePage: propTypes.func,
  isFavorite: propTypes.bool,
}

export default Pagination
