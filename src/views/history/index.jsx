import React from 'react';
import HistoryProductCard from 'components/history-product-card' 

const History = () => {
  const arr = [1, 2, 3];
  return (
    <div>
      {arr.map(el => {
        return <HistoryProductCard key={el} />
      })}
    </div>
  )
}

export default History