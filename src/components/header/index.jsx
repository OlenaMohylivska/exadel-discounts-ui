import React from "react"
import { Nav, Navbar } from "react-bootstrap"
import Logout from "../icons/Logout"
import "./styles.css"

function Header() {
	return (
		<Navbar className='justify-content-between padding'>
			<span>Logo</span>
			<Nav.Link href='#'>
				<h2>Main</h2>
			</Nav.Link>
			<Nav.Link href='#'>
				<h2>Profile</h2>
			</Nav.Link>
			<Nav.Link href='#'>
				<Logout />
			</Nav.Link>
		</Navbar>
	)
}

export default Header
