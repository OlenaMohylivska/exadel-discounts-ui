import React, { useState } from "react"
import { Button } from "react-bootstrap"
import "./styles.css"

const AddItem = () => {
	const [data, setData] = useState({ proposeType: "" })
	const handleChange = (e) => {
		setData({ ...data, [e.target.name]: e.target.value })
	}
	console.log(data)

	return (
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
					<textarea
						className='description-text'
						name='description'
						onChange={(e) => handleChange(e)}
						id=''></textarea>
				</div>
				<div className='btn-field'>
					<Button variant='primary'>save</Button>{" "}
					<Button variant='danger'>delete</Button>
				</div>
			</div>
			<div className='col input-fields '>
				<h4>Company Name:</h4>
				<input
					type='text'
					placeholder='Fill the company name,first letter must be uppercase'
					className='form-field'
					name='companyName'
					onChange={(e) => handleChange(e)}
					id=''
				/>
				<h4>Contacts:</h4>
				<input
					type='text'
					placeholder='Discount Provider’s contacts'
					className='form-field'
					name='contacts'
					id=''
					onChange={(e) => handleChange(e)}
				/>
				<h4>Discount Types:</h4>
				<input
					type='text'
					placeholder='Filter tags(use” ; ” for splitting)'
					className='form-field'
					name='discountTypes'
					onChange={(e) => handleChange(e)}
				/>
				<h4>Terms:</h4>
				<input
					type='text'
					placeholder='Date when discount expires'
					className='form-field'
					name='terms'
					onChange={(e) => handleChange(e)}
				/>
				<h4>Location:</h4>
				<input
					type='text'
					placeholder='Location'
					className='form-field'
					name='location'
					onChange={(e) => handleChange(e)}
				/>
				<div className='radio-box'>
					<div>
						<input
							type='radio'
							onChange={(e) => handleChange(e)}
							name='proposeType'
							id='product'
							value='product'
						/>
						<label htmlFor='product'>product</label>
					</div>
					<div>
						<input
							type='radio'
							onChange={(e) => handleChange(e)}
							name='proposeType'
							id='service'
							value='service'
						/>
						<label htmlFor='service'>service</label>
					</div>
				</div>
				{data.proposeType && data.proposeType == "product" ? (
					<>
						<h4>Limitations:</h4>
						<input
							type='text'
							placeholder='Disable button limitations'
							className='form-field'
							name='limitations'
							onChange={(e) => handleChange(e)}
						/>
					</>
				) : (
					""
				)}

				<h4>Promo:</h4>
				<input
					type='text'
					placeholder='Fill the name of promo'
					className='form-field'
					name='promo'
					onChange={(e) => handleChange(e)}
				/>
			</div>
		</div>
	)
}

export default AddItem
