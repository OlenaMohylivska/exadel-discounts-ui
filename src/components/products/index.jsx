import React from "react"
import Filters from "../filters"
import ProductCard from '../product-card'
import "./styles.css"

const ProductList = ({ data }) => {
	const fixedArr = data && data.length > 0 ? data.slice(0, 10) : []

	return (
		<div className='product-list'>
			<h1 className='h1-discount'>Discount</h1>
			<Filters />
			<ProductCard />
			<div className='list'>
				{/* Картки товару не створював оскільки цим Альона займається, не було сенсу */}
				{fixedArr.length > 0 &&
					fixedArr.map((elem) => (
						<div key={elem.id} style={{ margin: "50px", width: "300px" }}>
							<h4>{elem.title}:</h4>
							<p>{elem.body}</p>
						</div>
					))}
			</div>
			<span className='btn-all'>See all</span>
		</div>
	)
}

export default ProductList
