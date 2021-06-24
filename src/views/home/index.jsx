import React from "react"
import Slider from "../../components/slider"
import "./styles.scss"

function Home() {
  return (
    <div>
      <Slider />
      <div className="info">
        <div className="about-company-block">
          <img
            src="https://exadel.com/wp-content/uploads/2019/10/illustration.svg"
            alt="Exadel image"
          />
          <p>
            Exadel is fully committed to attracting, retaining, developing, and
            promoting the most qualified employees
          </p>
        </div>
        <div className="about-company-block">
          <p>
            We are dedicated to providing a work environment in which employees
            are treated with respect and dignity
          </p>
          <img src="https://exadel.com/wp-content/uploads/2019/09/guide.svg" />
        </div>
        <div className="about-company-block">
          <img src="https://exadel.com/wp-content/uploads/2019/09/plan.svg" />
          <p>
            Exadel partnering discount program is availble for all employees, so
            they can choose discounts based on their preferences
          </p>
        </div>
      </div>
    </div>
  )
}

export default Home
