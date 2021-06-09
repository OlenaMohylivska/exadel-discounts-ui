import React from 'react'
import { Container, Nav, Navbar, NavbarBrand } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import Logout from '../icons/Logout'
import Logo from '../icons/logo.png'
import './styles.scss'
import NavbarToggle from 'react-bootstrap/esm/NavbarToggle'
import NavbarCollapse from 'react-bootstrap/esm/NavbarCollapse'


function Header() {
	return (
		<Navbar collapseOnSelect expand="md" className="navbar" sticky="top">
			<Container className="nav-wrapper">
				<NavbarBrand>
					<div className="logo">
						<img src={Logo} alt="Exadel logotype" className="logo" />
					</div>
				</NavbarBrand>

				<NavbarToggle aria-controls="responsive-nav"/>
				<NavbarCollapse id="responsive-nav" className="burger">

					<Nav className="w-100 d-flex justify-content-between ps-2">

						<NavLink exact to="/" className="nav-item" activeClassName="nav-item-active" >
							Home
						</NavLink>

						<NavLink to="/profile" className="nav-item" activeClassName="nav-item-active">
							My account
						</NavLink>

						<NavLink to="/catalog" className="nav-item" activeClassName="nav-item-active" >
							Catalog
						</NavLink>

						<NavLink to="#" className="nav-item" activeClassName="nav-item-active">
							<Logout />
						</NavLink>

					</Nav>

				</NavbarCollapse>
			</Container>
		</Navbar>
	)
}

export default Header
