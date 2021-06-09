import React from "react";
import "./Header.css";
import ProfileTabs from "./ProfileTabs";

function Header() {
  return (
    <div className="profile">
      <ProfileTabs />
      <h3 className="profile__title">Personal Info</h3>
      <div className="profile__container">
        <div className="profile__icons">
          <div className="profile__icons-left">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-person-fill"
              viewBox="0 0 16 16"
            >
              <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
            </svg>
            <h6 className="profile__icons-title">Personal Info</h6>
          </div>
          <div className="profile__icons-right">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-pencil-square"
              viewBox="0 0 16 16"
            >
              <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
              <path
                fillRule="evenodd"
                d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
              />
            </svg>
            <h6 className="profile__icons-title">Edit</h6>
          </div>
        </div>
        <div className="profile__table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Surname</th>
                <th>Date of birth</th>
                <th>Gender</th>
                <th>Language</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Ivan</td>
                <td>Ivanov</td>
                <td>01.01.1990</td>
                <td>Gender</td>
                <td>Language</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Header;
