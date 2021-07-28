import React from "react"
import { Facebook, Twitter, Linkedin } from "react-bootstrap-icons"
import "./styles.scss"

function Footer() {
  return (
    <div className="footer-container">
      <div className="footer-inner">
        <div className="footer-corporate">
          <h5 className="footer-section-title">Corporate policy</h5>
          <ul className="footer-socials">
            <li>
              <a href="https://www.facebook.com/exadelinc/">
                <Facebook />
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com/company/exadel/mycompany/">
                <Linkedin />
              </a>
            </li>
            <li>
              <a href="https://twitter.com/exadel">
                <Twitter />
              </a>
            </li>
          </ul>
          <div className="code-version">Version: 29.07.2021-2</div>
        </div>
        <div className="footer-services">
          <h5 className="footer-section-title">Employee career path</h5>
          <ul className="footer-career">
            <li>Big Data & Analytics</li>
            <li>AI and Machine Learning</li>
            <li>Mobile Development</li>
            <li>Quality Assurance</li>
            <li>QA Automation</li>
            <li>UI/UX Services</li>
          </ul>
        </div>

        <div className="footer-industries">
          <h5 className="footer-section-title">Industries</h5>
          <ul className="footer-domains">
            <li>High Tech</li>
            <li>Media and Publishing</li>
            <li>Finance</li>
            <li>Ecommerce & Retail</li>
            <li>Healthcare & Wellness</li>
            <li>Transportation</li>
          </ul>
        </div>
      </div>
      <div className="footer-socials"></div>
    </div>
  )
}

export default Footer
