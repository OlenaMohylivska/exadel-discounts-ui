import React from "react"
import LinearProductCard from "components/linear-product-card"

const HistoryPage = () => {
  const arr = [1, 2, 3]
  return (
    <div>
      {arr.map((el) => {
        return <LinearProductCard key={el} />
      })}
    </div>
  )
}

export default HistoryPage
