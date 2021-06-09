import React from 'react';
import ProductCard from 'components/product-card';
import { Form, Button } from 'react-bootstrap';
import Loupe from 'components/icons/Loupe';
import './styles.css';


const Catalog = (data) => {
  let arr = [
    { title: 'Pizza' },
    { title: 'Sushi' },
    { title: 'Haircut' },
    { title: 'For pets' },
    { title: 'Dentistry' },
    { title: 'Clothes' }
  ]
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
            <option defaultValue>Kyiv</option>
            <option value="1">Minsk</option>
            <option value="2">Lviv</option>
            <option value="3">Vinnytsia</option>
          </select>
          <select className="form-select category-select" aria-label="Default select">
            <option defaultValue>Food</option>
            <option value="1">SPA</option>
            <option value="2">Sport</option>
            <option value="3">Entertainment</option>
          </select>
          <select className="form-select sorting-order-select" aria-label="default select">
            <option defaultValue>Price - Low to High</option>
            <option value="1">Price - High to Low</option>
            <option value="2">Discount - Low to High</option>
            <option value="3">Discount - High to Low</option>
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