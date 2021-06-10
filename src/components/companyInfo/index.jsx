import React from "react"
import "./styles.css"
function CompanyInfo() {
return (
<div class="companyInfo">
   <div class="row">
      <div class="col">
         <ul class="list-group">
            <li class="list-group-item disabled">
               Company Name
               <div class="company-info-logo">
                  <img src='' width='100' height='100'></img>               
               </div>
            </li>
         </ul>
      </div>
      <div class="col">
         <ul class="list-group">
            <li class="list-group-item">Phone number: </li>
            <li class="list-group-item">Address: </li>
            <li class="list-group-item"><a href="#"> Get more info</a></li>
         </ul>
      </div>
   </div>
</div>
)
}
export default CompanyInfo

