import React from "react"
import "./styles.scss"
import { PersonFill, PencilSquare } from "react-bootstrap-icons"
import { Form } from "react-bootstrap"

function ProfileUserInfo() {
  return (
    <div className="profile">
      <h3 className="profile-title">Personal Info</h3>
      <div className="profile-container">
        <div className="profile-icons">
          <div className="profile-icons-left">
            <PersonFill />
            <h6 className="profile-icons-title">Personal Info</h6>
          </div>
          <div className="profile-icons-right">
            <PencilSquare />
            <h6 className="profile-icons-title">Edit</h6>
          </div>
        </div>

        <Form className="form-input">
          <Form.Group className="form-floating">
            <Form.Control
              type="text"
              label="name"
              placeholder="Name"
              id="floatingInputName"
            />
            <label htmlFor="floatingInputName">Name</label>
          </Form.Group>

          <Form.Group className="form-floating">
            <Form.Control
              type="text"
              placeholder="Surname"
              id="floatingInputSurname"
            />
            <label htmlFor="floatingInputName">Surname</label>
          </Form.Group>
          <Form.Group className="form-floating">
            <Form.Control
              type="date"
              placeholder="Date of birth"
              id="floatingInputDate"
            />
            <label htmlFor="floatingInputDate">Date of birth</label>
          </Form.Group>
          <Form.Group className="form-floating">
            <Form.Control
              type="text"
              placeholder="Gender"
              id="floatingInputGender"
            />
            <label htmlFor="floatingInputGender">Gender</label>
          </Form.Group>
          <Form.Group className="form-floating">
            <Form.Control
              type="text"
              placeholder="Language"
              id="floatingInputLanguage"
            />
            <label htmlFor="floatingInputGender">Language</label>
          </Form.Group>
        </Form>
      </div>
    </div>
  )
}

export default ProfileUserInfo
