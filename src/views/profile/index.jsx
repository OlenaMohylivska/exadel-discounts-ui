import React from "react";
import "./styles.scss";
import { PersonFill, PencilSquare } from "react-bootstrap-icons";
import ProfileTabs from "../../components/tabs/ProfileTabs";

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
        <div className="profile-data">
          <ul className="profile-data-header">
            <li>Name</li>
            <li>Surname</li>
            <li>Date of birth</li>
            <li>Gender</li>
            <li>Language</li>
          </ul>
          <ul className="profile-data-filled">
            <li>Ivan</li>
            <li>Ivanov</li>
            <li>01.01.1990</li>
            <li>Gender</li>
            <li>Language</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Profile;
