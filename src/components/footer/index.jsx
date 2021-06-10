

import React from "react"
import "./styles.css"
import CompanyLogo from "../icons/CompanyLogo"

function Footer() {
return (
<div class="container">
   <div class="row">
      <div class="col">
         <ul class="list-group">
            <li class="list-group-item disabled">Get to Know Us</li>
            <li class="list-group-item"> <a href="/">Careers</a> </li>
            <li class="list-group-item"> <a href="/">Blog</a></li>
            <li class="list-group-item"> <a href="/">About us</a></li>
            <li class="list-group-item"> <a href="/">Careers</a></li>
         </ul>
      </div>
      <div class="col order-1">
         <ul class="list-group">
            <li class="list-group-item disabled">Make Money with Us</li>
            <li class="list-group-item"><a href="/">See More Make Money with Us</a></li>
         </ul>
      </div>
      <div class="col order-1">
         <ul class="list-group">
            <li class="list-group-item disabled">Products</li>
            <li class="list-group-item"><a href="/">Careers</a></li>
            <li class="list-group-item"> <a href="/">Blog</a></li>
            <li class="list-group-item"> <a href="/">About us</a></li>
            <li class="list-group-item"> <a href="/">Careers</a></li>
         </ul>
      </div>
      <div class="col order-1">
         <ul class="list-group">
            <li class="list-group-item disabled">Let Us Help You</li>
            <li class="list-group-item"><a href="/">Careers</a></li>
            <li class="list-group-item"><a href="/">Blog</a></li>
            <li class="list-group-item"><a href="/">About us</a></li>
            <li class="list-group-item"><a href="/">Careers</a></li>
         </ul>
      </div>
   </div>
   <div class="row">
      <div class="col">
         <CompanyLogo/>
      </div>
      <div class="col order-1">
         <select class="form-select" aria-label="Please choice your language">
            <option value="1">English</option>
            <option value="2">Ukrainian</option>
            <option value="3">Polish</option>
         </select>
      </div>
      <div class="col order-1">
         <select class="form-select" aria-label="Please choice money type">
            <option value="1">USD</option>
            <option value="2">UAH</option>
            <option value="3">PLN</option>
         </select>
      </div>
      <div class="col order-1">
         <select class="form-select" aria-label="Please choice your location">
            <option value="1">US</option>
            <option value="2">Ukraine</option>
            <option value="3">Poland</option>
         </select>
      </div>
   </div>
</div>
)
}
export default Footer

