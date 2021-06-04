import React from "react";
import Logout from "../icons/Logout";

function Header() {
	return (
		<div
			style={{
				display: "flex",
				flexDirection: "row",
				justifyContent: "space-between",
				padding: "20px 50px   ",
			}}>
			<span>Logo</span>
			<h2>Main</h2>
			<h2>Profile</h2>
			<span>
				<Logout />
			</span>
		</div>
	);
}

export default Header;
