import React from "react"
import LinearProductCard from "components/linear-product-card"
import { StarFill } from "react-bootstrap-icons"

const FavouritePage = () => {
  const [arr, setArr] = React.useState([
    { id: 1, isFavourite: false },
    { id: 2, isFavourite: true },
    { id: 3, isFavourite: false },
    { id: 4, isFavourite: false },
  ])

  function toggleFavourite(id) {
    setArr(
      arr.map((el) => {
        if (el.id === id) {
          el.isFavourite = !el.isFavourite
        }
        return el
      })
    )
  }

  return (
    <div className="container">
      <div className="row">
        {arr.map((el) => (
          <LinearProductCard
            IconComponent={StarFill}
            id={el.id}
            favourite={el.isFavourite}
            toggleFavourite={toggleFavourite}
            key={el.id}
          />
        ))}
      </div>
    </div>
  )
}

export default FavouritePage
