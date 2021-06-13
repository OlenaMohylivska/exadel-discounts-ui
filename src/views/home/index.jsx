import React, { useEffect, useState } from "react"
import Slider from "../../components/slider"
import Products from "../../components/products"
import "./styles.scss"
import { Container } from "react-bootstrap"

function Home() {
  const [data, setData] = useState()

  const fetchData = async () => {
    await fetch("https://jsonplaceholder.typicode.com/posts").then(
      (response) => response.json().then((res) => setData(res))
    )
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div>
      <Slider />
      <Products data={data} />
      <Container>
        <div className="info">
          <div className="about-company-wrapper">
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Adipisci exercitationem, explicabo ducimus perferendis eligendi, delectus aliquam unde magnam nam sed tempore quae dolorum hic ullam ut expedita quas tenetur nesciunt.</p>
          </div>

          <div className="statistics-wrapper">
            {/* number in span should be changed to props*/}
            <p>More than <span>200</span> people used our services</p>
            <p>We cooperate with <span>90+</span> companies</p>
            <p>We have <span>1768</span> special propositions for you right now</p>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default Home
