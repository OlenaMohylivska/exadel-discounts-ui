import React from "react"
import "./styles.css"

const FetchError = () => {
  return (
    <>
      <div className='error-text'>
        Sorry have some problems with server. Please, be patient waiting for
        fixing... Okay?
      </div>
      <img
        className='waiting'
        src='https://i.pinimg.com/originals/cc/e8/ef/cce8ef91e7601e47dab1e56c973bf75c.jpg'
        alt=''
      />
    </>
  )
}

export default FetchError
