import React from "react"
import "./styles.css"
import {Card,ListGroup} from 'react-bootstrap'
function HowUseThisService() {
return (
<Card class="how-card">
   <ListGroup variant="flush">
      <ListGroup.Item>Find the company you want using a filter or search.</ListGroup.Item>
      <ListGroup.Item>Investigate available discounts.</ListGroup.Item>
   </ListGroup>
</Card>
)
}
export default HowUseThisService