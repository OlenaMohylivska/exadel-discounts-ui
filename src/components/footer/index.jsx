import React from "react"
import "./styles.css"

function Footer() {
return (
<div class="row">
   <div class="column">
      <p>Get to Know Us</p>
      <p><a href="#">Careers</a></p>
      <p><a href="#">Blog</a></p>
      <p><a href="#">About us</a></p>
   </div>
   <div class="column">
      <p>Make Money with Us</p>
      <p><a href="#">Self-Publish with Us</a></p>
   </div>
   <div class="column">
      <p>Products</p>
      <p><a href="#">Business Advice</a></p>
   </div>
   <div class="column">
      <p>Let Us Help You</p>
      <p><a href="#">Your Account</a></p>
      <p><a href="#">Help</a></p>
   </div>
   <div class="lower">
      <div class="column">
         <img src="images/logo.png" 
            width="100" height="100" alt="logo"/>
      </div>
      <div class="column">
         <select>
            <option>English</option>
            <option>Ukrainian</option>
            <option>Polish</option>
            <option>Russian</option>
         </select>
      </div>
      <div class="column">
         <select>
            <option>USD</option>
            <option>UAH</option>
            <option>PLN</option>
            <option>RUB</option>
         </select>
         <div class="column">
            <select>
               <option>United State</option>
               <option>Ukraine</option>
               <option>Polish</option>
               <option>Russia</option>
            </select>
         </div>
      </div>
   </div>
</div>
)
}
export default Footer