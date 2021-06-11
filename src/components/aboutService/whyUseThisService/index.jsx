import React from "react"
import "./styles.css"
import {Card,ListGroup} from 'react-bootstrap'
function WhyUseThisService() {
return (
<Card class="why-card">
   <ListGroup variant="flush" text-primary>
      <ListGroup.Item>Get new buyers.</ListGroup.Item>
      <ListGroup.Item>Support old customers.</ListGroup.Item>
      <ListGroup.Item>Explore the market with feedback.</ListGroup.Item>
   </ListGroup>
</Card>
)
}
export default WhyUseThisService