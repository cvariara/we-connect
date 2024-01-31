import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Profile = ({ userData }) => {
  //console.log('userData in Profile', userData);
  if (!userData) {
    return <p>Loading...</p>
  }

  return (
    <div className="profile-container">
      <img src={userData.profilePicture} className="profile-picture-lg" />
      <div className="profile-user-info">
        <span className="profile-user-name">{userData.fullName}</span>
        <span className="profile-user-username">{userData.username}</span>
      </div>
      <div className="profile-logout"></div>
      <div className="profile-friends">

      </div>
    </div>
  );
}

export default Profile;