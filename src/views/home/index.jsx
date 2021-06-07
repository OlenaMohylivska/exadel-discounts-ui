import React, { useEffect, useState } from "react"
import PrimaryButton from "./../../components/buttons/primary"
import Slider from "../../components/slider"
import ProductList from "./productList"
import "./styles.css"

function Home() {
	const [data, setData] = useState()
	const [mounted, setMounted] = useState(false)
	useEffect(async () => {
		if (!mounted) {
			await fetch("https://jsonplaceholder.typicode.com/posts").then(
				(response) => response.json().then((res) => setData(res))
			)
			setMounted(true)
		}
		if (mounted) {
			return
		}
	}, [mounted])

	return (
		<div>
			<Slider />
			<ProductList data={data} />
			<div className='about-info'> content about company</div>
		</div>
	)
}

export default Home
