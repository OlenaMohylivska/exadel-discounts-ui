import { useAccordionToggle } from "react-bootstrap"

function CustomToggle({ children, eventKey }) {
	const decoratedOnClick = useAccordionToggle(eventKey, () => {})

	return (
		<button
			type='button'
			style={{
				backgroundColor: "#0d6efd",
				padding: "5px 40px",
				outline: "none",
				border: "1px solid #0d6efd",

				color: "white",
			}}
			onClick={decoratedOnClick}>
			{children}
		</button>
	)
}

export default CustomToggle
