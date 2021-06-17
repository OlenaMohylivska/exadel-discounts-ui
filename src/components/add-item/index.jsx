import React, { useState } from "react"
import { Button, Form, FormControl, InputGroup, Image } from "react-bootstrap"
import Error from "../error"
import "./styles.css"

const AddItem = () => {
  const [data, setData] = useState({})
  const [errors, setErrors] = useState({})
  // const [img, setImg] = useState(null)
  const [description, setDescription] = useState({})
  const [companyName, setCompanyName] = useState({})
  const [contacts, setContacts] = useState({})
  const [discountTypes, setDiscountTypes] = useState({})
  const [terms, setTerms] = useState({})
  const [location, setLocation] = useState({})
  const [proposeType, setProposeType] = useState({})
  const [limitations, setLimitations] = useState({})
  const [promo, setPromo] = useState({})

  /* const imgHandleChange = (e) => {
    setImg({ [e.target.name]: e.target.value })
  } */
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
    setLimitations({ [e.target.name]: e.target.value })
  }
  const promoHandleChange = (e) => {
    setPromo({ [e.target.name]: e.target.value })
  }
  const validate = () => {
    const error = {}
    if (!description.description) error.description = "Description cannot be blank"
    if (!companyName.companyName) error.companyName = "Company name cannot be blank"
    if (!contacts.contacts) error.contacts = "Contacts cannot be blank"
    if (!discountTypes.discountTypes) error.discountTypes = "Discount Types cannot be blank"
    if (!terms.terms) error.terms = "Terms cannot be blank"
    if (!location.location) error.location = "Location cannot be blank"
    if (!proposeType.proposeType) error.location = "Please choose propose type"
    if (proposeType.proposeType === "product" && !limitations.limitations) error.limitations = "Limitations cannot be blank"
    if (!promo.promo) error.promo = "Promo cannot be blank"
    return error
  }

  const submit = () => {
    const errorObj = validate()

    if (Object.keys(errorObj).length >= 0) {
      setErrors(errorObj)
    }
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
  const reset = () => {
    setErrors({})
    setDescription({})
    setCompanyName({})
    setContacts({})
    setDiscountTypes({})
    setTerms({})
    setLocation({})
    setProposeType({})
    setLimitations({})
    setPromo({})
  }

  return (
    <Form>
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <div className="load-img mt-3">
              <Image src="https://via.placeholder.com/600/24f355" className="w-50" rounded />
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
                  onChange={() => descriptionHandleChange()}
                  id=''
                />
              </InputGroup>
              {errors.description ? <Error error={errors.description} /> : ''}
            </div>
            <div className='btn-field'>
              <Button variant='primary' className='btn' onClick={() => submit()}>
                save
              </Button>{" "}
              <Button variant='danger' onClick={() => reset()} className='btn'>
                reset
              </Button>
            </div>
          </div>
          <div className="col-lg-6 input-fields mt-3">
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
            {errors.companyName && errors.companyName !== "" ? <Error error={errors.companyName} /> : ''}
            <h4>Contacts:</h4>
            <InputGroup>
              <FormControl
                placeholder='Discount Provider’s contacts'
                name='contacts'
                onChange={(e) => contactsHandleChange(e)}
                className='form-field'
              />
            </InputGroup>
            {errors.contacts ? <Error error={errors.contacts} /> : ''}
            <h4>Discount Types:</h4>
            <InputGroup>
              <FormControl
                placeholder='Filter tags(use” ; ” for splitting)'
                name='discountTypes'
                onChange={(e) => discountTypesHandleChange(e)}
                className='form-field'
              />
            </InputGroup>
            {errors.discountTypes ? <Error error={errors.discountTypes} /> : ''}
            <h4>Terms:</h4>
            <InputGroup>
              <FormControl
                placeholder='Date when discount expires'
                name='terms'
                onChange={(e) => termsHandleChange(e)}
                className='form-field'
              />
            </InputGroup>
            {errors.terms ? <Error error={errors.terms} /> : ''}
            <h4>Location:</h4>
            <InputGroup>
              <FormControl
                placeholder='Location'
                name='location'
                onChange={(e) => locationHandleChange(e)}
                className='form-field'
              />
            </InputGroup>
            {errors.location ? <Error error={errors.location} /> : ""}
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
            {errors.proposeType ? <Error error={errors.proposeType} /> : ""}
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
                {errors.limitations ? <Error error={errors.limitations} /> : ""}
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
            {errors.promo ? <Error error={errors.promo} /> : ""}
          </div>
        </div>
      </div>
    </Form>
  )
}

export default AddItem
