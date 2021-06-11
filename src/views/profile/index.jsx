import React from "react";
import "./styles.scss";
import { PersonFill, PencilSquare } from "react-bootstrap-icons";
import ProfileTabs from "../../components/tabs/ProfileTabs";
import { Form, FormGroup } from "react-bootstrap";

function Profile() {
  return (
    <div className="profile">
      <ProfileTabs />
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
          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Control type="text" placeholder="Name" />
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Control type="text" placeholder="Surname" />
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Control type="date" placeholder="Date of birth" />
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Control type="text" placeholder="Gender" />
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Control type="text" placeholder="Language" />
          </Form.Group>
        </Form>
      </div>
    </div>
  );
}

export default Profile;
