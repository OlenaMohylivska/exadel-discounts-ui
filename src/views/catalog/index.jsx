import React from 'react';
import ProductCard from 'components/product-card';
import { Form, Button } from 'react-bootstrap';
import Loupe from 'components/icons/Loupe';
import './styles.css';

const Catalog = (data) => {
  const arr = [
    { title: 'Pizza' },
    { title: 'Sushi' },
    { title: 'Haircut' },
    { title: 'For pets' },
    { title: 'Dentistry' },
    { title: 'Clothes' }];

  const cities = ["Kyiv", "Minsk", "Lviv", "Vinnytsia"];
  const categories = ["Food", "SPA", "Sport", "Entertainment"];
  const sortingOptions = ["Price - Low to High", "Price - High to Low", "Discount - Low to High", "Discount - High to Low"];

  return (
    <div className="container">
      <h1 className="catalog-title">Catalog</h1>
      <div className="row filter-panel">
        <label className="col-lg-5 col-md-12 search-container">
          <div className="search-icon"><Loupe /></div>
          <Form className="search-input">
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Control type="text" placeholder="Enter your search" />
            </Form.Group>
          </Form>
        </label>
        <div className="catalog-filters col-lg-7 col-md-12">
          <select className="form-select city-select" aria-label="Default select">
            {cities.map((city, index) => <option value={index + 1} key={index + 1}>{city}</option>)}
          </select>
          <select className="form-select category-select" aria-label="Default select">
            {categories.map((category, index) => <option value={index + 1} key={index + 1}>{category}</option>)}
          </select>
          <select className="form-select sorting-order-select" aria-label="default select">
            {sortingOptions.map((option, index) => <option value={index + 1} key={index + 1}>{option}</option>)}
          </select>
        </div>
      </div>
      <div className="products-wrapper">
        {arr.map((el) => {
          return <ProductCard elem={el} key={el.title} />
        })}
      </div>
      <div className="btn-wrapper">
        <Button variant="warning">Show more</Button>
      </div>
    </div>
  )
}

export default Catalog