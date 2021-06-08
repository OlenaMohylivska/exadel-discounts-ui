import { useAccordionToggle } from "react-bootstrap"
import "./styles.css"

function CustomToggle({ children, eventKey }) {
	const decoratedOnClick = useAccordionToggle(eventKey, () => {})

	return (
		<button type='button' className='button' onClick={decoratedOnClick}>
			{children}
		</button>
	)
}

export default CustomToggle
