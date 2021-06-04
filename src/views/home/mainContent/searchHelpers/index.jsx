import React from "react";
import Loupe from "../../../../components/icons/Loupe";

const SearchHelpers = () => {
	return (
		<div
			style={{
				display: "flex",
				justifyContent: "space-between",
			}}>
			<span>Filter</span>
			<div>
				<span htmlFor='search' style={{ marginRight: "10px" }}>
					<Loupe />
				</span>{" "}
				<input id='search' type='text' name='' id='' />
			</div>
			<span>Sort by</span>
		</div>
	);
};

export default SearchHelpers;
