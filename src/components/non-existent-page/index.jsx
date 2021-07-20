import React from "react"
import { Image } from "react-bootstrap"
import NotFoundImg from "../../assets/not-found-page.jpg"

const NonExistentPage = () => {
  return (
    <div className="text-center">
      <h2>Page not found</h2>
      <Image src={NotFoundImg} className="w-50" />
    </div>
  )
}

export default NonExistentPage