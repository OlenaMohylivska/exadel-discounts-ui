import React from 'react'
import { Carousel } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Image1 from '../../assets/1.jpg'
import Image2 from '../../assets/2.jpg'
import Image3 from '../../assets/3.jpg'
import './styles.css'

const Slider = () => {
  const sliderImages = [Image1, Image2, Image3]
  return (
    <Carousel prevLabel={null} nextLabel={null} pause={false} interval={4000} slide={false} className="carousel">
      {sliderImages.map((image, index) => {
        return (
          <Carousel.Item key={index + 1}>
            <Link to="/Login">
              <img
                className="d-inline-block w-100 img"
                src={image}
                alt={`Slide ${index + 1}`}
              />
            </Link>
          </Carousel.Item>
        )
      })}
    </Carousel>
  )
}

export default Slider