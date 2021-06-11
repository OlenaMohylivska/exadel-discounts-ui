import React from "react"
import "./styles.css"
import WhyUseThisService from "./whyUseThisService"
import HowUseThisService from "./howUseThisService"
import {Tab, Row, Nav, Col} from 'react-bootstrap'
function AboutService() {
return (
<div class="companyInfo">
   <Tab.Container id="left-tabs" defaultActiveKey="first">
      <Row>
         <Col sm={3}>
         <Nav variant="pills" className="flex-column">
            <Nav.Item>
               <Nav.Link eventKey="first">Why use this service? </Nav.Link>
            </Nav.Item>
            <Nav.Item>
               <Nav.Link eventKey="second">How use this service?</Nav.Link>
            </Nav.Item>
         </Nav>
         </Col>
         <Col sm={9}>
         <Tab.Content>
            <Tab.Pane eventKey="first">
               <WhyUseThisService />
            </Tab.Pane>
            <Tab.Pane eventKey="second">
               <HowUseThisService />
            </Tab.Pane>
         </Tab.Content>
         </Col>
      </Row>
   </Tab.Container>
</div>
)
}
export default AboutService