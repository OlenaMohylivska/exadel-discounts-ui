import React from "react"
import Loupe from "../icons/Loupe"
import "./styles.css"

const Filters = () => {
	return (
		<div
			style={{
				display: "flex",
				justifyContent: "space-between",
			}}>
			<span>Filter</span>
			<div>
				<span htmlFor='search' className='icon'>
					<Loupe />
				</span>{" "}
				<input id='search' type='text'/>
			</div>
			<span>Sort by</span>
		</div>
	)
}

export default Filters
