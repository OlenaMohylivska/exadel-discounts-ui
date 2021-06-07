import React, { useEffect, useState } from "react"
import PrimaryButton from "./../../components/buttons/primary"
import Slider from "../../components/slider"
import ProductList from "./productList"

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
	})

	return (
		<div>
			<Slider />

			<ProductList data={data} />
			<div
				style={{
					border: "1px solid black",
					margin: "100px auto",
					width: "1200px",
					height: "300px",
					padding: "10px",
				}}>
				{" "}
				content about company
			</div>
		</div>
	)
}

export default Home
