import React, { useState } from "react"
import Filters from "components/filters"
import ProductCard from "components/product-card"
import { Button } from 'react-bootstrap';
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
		<div className='container'>
			<h1 className='py-5 text-center'>Discount</h1>
			<Filters setVal={setVal} />

			<div className='d-flex justify-content-xl-between justify-content-lg-around justify-content-md-around products-wrapper flex-wrap'>
				{fixedArr.length > 0 &&
					filter(fixedArr, val).map((elem) => (
						<ProductCard key={elem.id} elem={elem} />
					))}
			</div>
			<div className="btn-wrapper">
        		<Button variant="success" className="px-4">See all</Button>
      		</div>
		</div>
	)
}

export default ProductList
