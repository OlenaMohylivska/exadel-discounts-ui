import React from "react"
import { Container, Nav, Navbar, NavbarBrand } from "react-bootstrap"
import { NavLink, Link } from "react-router-dom"
import Logo from "../icons/logo.png"
import "./styles.scss"
import NavbarToggle from "react-bootstrap/esm/NavbarToggle"
import NavbarCollapse from "react-bootstrap/esm/NavbarCollapse"
import { logout } from "store/utils"

function Header() {
  return (
    <Navbar collapseOnSelect expand="md" className="navbar" sticky="top" w-100>
      <Container className="nav-wrapper">
        <NavbarBrand>
          <div className="logo">
            <Link to="/">
              <img src={Logo} alt="Exadel logotype" className="logo" />
            </Link>
          </div>
        </NavbarBrand>

        <NavbarToggle aria-controls="responsive-nav" />
        <NavbarCollapse id="responsive-nav" className="burger">
          <Nav className="w-100 d-flex ms-5 text-right header-menu">
            <NavLink
              exact
              to="/"
              className="menu-link"
              activeClassName="menu-link-active"
            >
              Home
            </NavLink>

            <NavLink
              to="/profile"
              className="menu-link"
              activeClassName="menu-link-active"
            >
              My account
            </NavLink>

            <NavLink
              to="/admin"
              className="menu-link"
              activeClassName="menu-link-active"
            >
              Admin panel
            </NavLink>

            <NavLink
              to="/login"
              className="menu-link"
              activeClassName="menu-link-active"
            >
              Sign In
            </NavLink>

            <NavLink
              to="/login"
              className="nav-item"
              activeClassName="nav-item-active"
              onClick={logout}
            >
              Log out
            </NavLink>

            <NavLink
              to="/login"
              className="nav-item"
              activeClassName="nav-item-active"
              onClick={logout}
            >
              Log out
            </NavLink>
          </Nav>
        </NavbarCollapse>
      </Container>
    </Navbar>
  )
}

export default Header
