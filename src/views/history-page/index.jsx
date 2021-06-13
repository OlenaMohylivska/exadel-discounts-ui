import React from 'react';
import OrderHistory from 'components/order-history' 

const HistoryPage = () => {
  const arr = [1, 2, 3];
  return (
    <div>
      {arr.map(el => {
        return <OrderHistory key={el} />
      })}
    </div>
  )
}

export default HistoryPage