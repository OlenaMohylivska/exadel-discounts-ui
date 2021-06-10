import React, { useState } from "react"
import { Button, Form, FormControl, InputGroup } from "react-bootstrap"
import "./styles.css"

const AddItem = () => {
	const [data, setData] = useState({})

	const [img, setImg] = useState(null)
	const [description, setDescription] = useState({})
	const [companyName, setCompanyName] = useState({})
	const [contacts, setContacts] = useState({})
	const [discountTypes, setDiscountTypes] = useState({})
	const [terms, setTerms] = useState({})
	const [location, setLocation] = useState({})
	const [proposeType, setProposeType] = useState({})
	const [limitations, SetLimitations] = useState({})
	const [promo, setPromo] = useState({})

	const imgHandleChange = (e) => {
		setImg({ [e.target.name]: e.target.value })
	}
	const descriptionHandleChange = (e) => {
		setDescription({ [e.target.name]: e.target.value })
	}
	const companyNameHandleChange = (e) => {
		setCompanyName({ [e.target.name]: e.target.value })
	}
	const contactsHandleChange = (e) => {
		setContacts({ [e.target.name]: e.target.value })
	}
	const discountTypesHandleChange = (e) => {
		setDiscountTypes({ [e.target.name]: e.target.value })
	}
	const termsHandleChange = (e) => {
		setTerms({ [e.target.name]: e.target.value })
	}
	const locationHandleChange = (e) => {
		setLocation({ [e.target.name]: e.target.value })
	}
	const proposeTypeHandleChange = (e) => {
		setProposeType({ [e.target.name]: e.target.value })
	}
	const limitationsHandleChange = (e) => {
		SetLimitations({ [e.target.name]: e.target.value })
	}
	const promoHandleChange = (e) => {
		setPromo({ [e.target.name]: e.target.value })
	}

	const submit = (e) => {
		setData(
			Object.assign(
				data,
				description,
				companyName,
				contacts,
				discountTypes,
				terms,
				location,
				proposeType,
				limitations,
				promo
			)
		)
	}
	console.log(data)

	return (
		<Form>
			<div className='container'>
				<div className='col'>
					<div className='load-img'>
						<div className='img'>img</div>
						<label className='file' htmlFor='file'>
							choose file
						</label>
						<input type='file' name='' id='file' />
					</div>
					<div className='description'>
						<h3>Description:</h3>
						<InputGroup>
							<FormControl
								as='textarea'
								className='description-text'
								name='description'
								onChange={(e) => descriptionHandleChange(e)}
								id=''
							/>
						</InputGroup>
					</div>
					<div className='btn-field'>
						<Button variant='primary' className='btn' onClick={(e) => submit()}>
							save
						</Button>{" "}
						<Button variant='danger' className='btn'>
							delete
						</Button>
					</div>
				</div>
				<div className='col input-fields  '>
					<h4>Company Name</h4>
					<InputGroup>
						<FormControl
							className='form-field'
							size='sm'
							placeholder='Fill the company name,first letter must be uppercase'
							name='companyName'
							onChange={(e) => companyNameHandleChange(e)}
						/>
					</InputGroup>

					<h4>Contacts:</h4>
					<InputGroup>
						<FormControl
							placeholder='Discount Provider’s contacts'
							name='contacts'
							onChange={(e) => contactsHandleChange(e)}
							className='form-field'
						/>
					</InputGroup>
					<h4>Discount Types:</h4>
					<InputGroup>
						<FormControl
							placeholder='Filter tags(use” ; ” for splitting)'
							name='discountTypes'
							onChange={(e) => discountTypesHandleChange(e)}
							className='form-field'
						/>
					</InputGroup>
					<h4>Terms:</h4>
					<InputGroup>
						<FormControl
							placeholder='Date when discount expires'
							name='terms'
							onChange={(e) => termsHandleChange(e)}
							className='form-field'
						/>
					</InputGroup>
					<h4>Location:</h4>
					<InputGroup>
						<FormControl
							placeholder='Location'
							name='location'
							onChange={(e) => locationHandleChange(e)}
							className='form-field'
						/>
					</InputGroup>
					<div className='radio-box'>
						<div>
							<input
								type='radio'
								onChange={(e) => proposeTypeHandleChange(e)}
								name='proposeType'
								id='product'
								value='product'
								aria-label='Radio button for following text input'
							/>
							<label htmlFor='product'>product</label>
						</div>
						<div>
							<input
								type='radio'
								onChange={(e) => proposeTypeHandleChange(e)}
								name='proposeType'
								id='service'
								value='service'
							/>
							<label htmlFor='service'>service</label>
						</div>
					</div>
					{proposeType.proposeType && proposeType.proposeType == "product" ? (
						<>
							<h4>Limitations:</h4>
							<InputGroup>
								<FormControl
									placeholder='Disable button limitations'
									name='limitations'
									onChange={(e) => limitationsHandleChange(e)}
									className='form-field'
								/>
							</InputGroup>
						</>
					) : (
						""
					)}

					<h4>Promo:</h4>
					<InputGroup>
						<FormControl
							placeholder='Fill the name of promo'
							name='promo'
							onChange={(e) => promoHandleChange(e)}
							className='form-field'
						/>
					</InputGroup>
				</div>
			</div>
		</Form>
	)
}

export default AddItem
