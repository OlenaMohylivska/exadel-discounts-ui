import React from "react";
import { Accordion } from "react-bootstrap";
import CustomToggle from "../custom-toggle";
import PropTypes from "prop-types";
import Loupe from "../icons/Loupe";
import "./styles.css";

const Filters = ({ setVal }) => {
  const handleChange = (e) => {
    setVal(e.target.value);
  };
  return (
    <div className="filters">
      <Accordion>
        <div className="form">
          <CustomToggle eventKey="0">Filter</CustomToggle>
          <Accordion.Collapse eventKey="0">
            <form className="form">
              <div>
                <input type="radio" name="filter" id="sport" />
                <label htmlFor="sport">sport</label>
              </div>
              <div>
                <input type="radio" name="filter" id="restaurants" />
                <label htmlFor="restaurants">restaurants</label>
              </div>
              <div>
                <input type="radio" name="filter" id="cinema" />
                <label htmlFor="cinema">cinema</label>
              </div>
            </form>
          </Accordion.Collapse>
        </div>
      </Accordion>
      <div>
        <label htmlFor="search" className="icon">
          <Loupe />
        </label>{" "}
        <input id="search" onChange={(e) => handleChange(e)} type="text" />
      </div>
      <Accordion>
        <div className="form">
          <CustomToggle eventKey="1">Sort by</CustomToggle>
          <Accordion.Collapse eventKey="1">
            <form className="form">
              <div>
                <input type="radio" name="sort" id="new" />
                <label htmlFor="new">new</label>
              </div>
              <div>
                <input type="radio" name="sort" id="top-rated" />
                <label htmlFor="top-rated">top rated</label>
              </div>
            </form>
          </Accordion.Collapse>
        </div>
      </Accordion>
    </div>
  );
};

export default Filters;

Filters.propTypes = {
  setVal: PropTypes.func,
};
