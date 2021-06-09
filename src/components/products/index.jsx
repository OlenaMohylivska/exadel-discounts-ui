import React, { useState } from "react"
import Filters from "components/filters"
import ProductCard from "components/product-card"
import "./styles.css"

const ProductList = ({ data }) => {
	const [val, setVal] = useState("")
	const fixedArr = data && data.length > 0 ? data.slice(0, 9) : []
	console.log(fixedArr)
	console.log(val)
	const filter = (arr1, val1) => {
		return arr1.filter(
			(item) =>
				item.title.toLowerCase().includes(val1.toLowerCase()) ||
				item.body.toLowerCase().includes(val1.toLowerCase())
		)
	}
	return (
		<div className='product-list'>
			<h1 className='h1-discount'>Discount</h1>
			<Filters setVal={setVal} />

			<div className='list'>
				{/* Картки товару не створював оскільки цим Альона займається, не було сенсу */}
				{fixedArr.length > 0 &&
					filter(fixedArr, val).map((elem) => (
						<ProductCard key={elem.id} elem={elem} />
					))}
			</div>
			<span className='btn-all'>See all</span>
		</div>
	)
}

export default ProductList
