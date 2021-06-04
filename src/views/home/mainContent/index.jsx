import React from "react";
import SearchHelpers from "./searchHelpers";

const MainContent = ({ data }) => {
	const fixedArr = data && data.length > 0 ? data.slice(0, 10) : [];

	return (
		<div style={{ padding: "20px 100px", textAlign: "center" }}>
			<h1 style={{ textAlign: "center", padding: "60px" }}>Discount</h1>
			<SearchHelpers />
			<div
				style={{
					display: "grid",
					gridTemplateColumns: "25% 25% 25% 25%",
				}}>
				{/* Картки товару не створював оскільки цим Альона займається, не було сенсу */}
				{fixedArr.length > 0 &&
					fixedArr.map((elem) => (
						<div style={{ margin: "50px" }}>
							<h4>{elem.title}:</h4>
							<p>{elem.body}</p>
						</div>
					))}
			</div>
			<span
				style={{
					background: "#19F422",
					padding: "20px 40px",
					fontSize: "24px",
					cursor: "pointer",
					borderRadius: "20px",
					margin: "20px auto",
				}}>
				See all
			</span>
		</div>
	);
};

export default MainContent;
