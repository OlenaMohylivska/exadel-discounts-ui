import React, { useEffect, useState } from "react"
import Slider from "../../components/slider"
import ProductList from "./productList"
import "./styles.css"

function Home() {
	const [data, setData] = useState()

	const fetchData = async () => {
		await fetch("https://jsonplaceholder.typicode.com/posts").then(
			(response) => response.json().then((res) => setData(res))
		)
	}

	useEffect(() => {
		fetchData()
	}, [])

	return (
		<div>
			<Slider />
			<ProductList data={data} />
			<div className='about-info'> content about company</div>
		</div>
	)
}

export default Home
