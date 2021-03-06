import React, { useContext, useEffect, useState } from "react"
import { Container, Nav, Navbar, NavbarBrand } from "react-bootstrap"
import { NavLink, Link } from "react-router-dom"
import Logo from "../icons/logo.png"
import SmallLogo from "../icons/small-logo.png"
import "./styles.scss"
import NavbarToggle from "react-bootstrap/esm/NavbarToggle"
import NavbarCollapse from "react-bootstrap/esm/NavbarCollapse"
import { Context } from "store/context"

function Header() {
  const { isAuthorized, setIsAuthorized } = useContext(Context)
  const [showSmallLogo, setShowSmallLogo] = useState(false)

  useEffect(() => {
    if (!!localStorage.getItem("jwt") && isAuthorized === false) {
      return setIsAuthorized(true)
    }
  }, [])
  const logout = () => {
    localStorage.clear()
    setIsAuthorized(false)
  }
  const changeLogo = () => {
    if (window.scrollY > 80) {
      setShowSmallLogo(true)
    } else {
      setShowSmallLogo(false)
    }
  }
  window.addEventListener("scroll", changeLogo)

  return (
    <Navbar collapseOnSelect expand="md" className="navbar" sticky="top">
      <Container className="nav-wrapper">
        <NavbarBrand>
          <div className="logo">
            <Link to={isAuthorized ? "/" : "/login"}>
              <img
                src={showSmallLogo ? SmallLogo : Logo}
                alt="Exadel logotype"
                className="logo"
              />
            </Link>
          </div>
        </NavbarBrand>

        <NavbarToggle aria-controls="responsive-nav" />
        <NavbarCollapse id="responsive-nav" className="burger">
          <Nav className="w-100 d-flex lg-ms-5 text-right header-menu">
            {isAuthorized ? (
              <>
                {localStorage.getItem("role") === "USER" ? (
                  <>
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
                  </>
                ) : (
                  <>
                    <NavLink
                      to="/admin"
                      className="menu-link"
                      activeClassName="menu-link-active"
                    >
                      Admin panel
                    </NavLink>
                  </>
                )}
                <NavLink
                  to="/login"
                  className="menu-link"
                  activeClassName="menu-link-active"
                  onClick={logout}
                >
                  Log out
                </NavLink>
              </>
            ) : (
              <NavLink
                to="/login"
                className="menu-link"
                activeClassName="menu-link-active"
              >
                Sign In
              </NavLink>
            )}
          </Nav>
        </NavbarCollapse>
      </Container>
    </Navbar>
  )
}

export default Header
