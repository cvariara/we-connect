import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

import { RotatingLines } from "react-loader-spinner";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import SettingsIcon from '@mui/icons-material/Settings';
import { Button, Modal } from "@mui/material";

import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";

import FriendsList from "../components/FriendsList";
import Requests from "../components/Requests";

const Profile = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const { id } = useParams();
  const navigate = useNavigate();

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userFound, setUserFound] = useState(true);
  const [showFriends, setShowFriends] = useState(false);
  const [showRequests, setShowRequests] = useState(false);
  const [friendReqSent, setFriendReqSent] = useState(false);

  const handleLogout = () => {
    logout();

    navigate('/login');
  }

  const handleOpen = () => setShowFriends(true);
  const handleClose = () => setShowFriends(false);

  const handleOpenRequests = () => setShowRequests(true);
  const handleCloseRequests = () => setShowRequests(false);

  const handleAddFriend = async () => {
    try {
      const response = await fetch(`http://localhost:4000/api/friendship/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          senderID: user.username,
          receiverID: userData.username 
        })
      });

      if (response.ok) {
        setFriendReqSent(true);
      }
    } catch (error) {
      console.error('Failed to add user!');
    }
  }

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/user/profile/${id}`);
        const json = await response.json();

        if (response.ok) {
          setUserData(json);
        } else {
          console.error("Failed to fetch user profile");
          setUserFound(false);
        }
      } catch (error) {
        console.error("Error fetching user profile:", error.message);
        setUserFound(false);
      } finally {
        setLoading(false);
      }
    };

    // Ensure user.username is present before making the fetch request
    if (user && user.username) {
      fetchUserData();
    }
  }, [user, id]);
  
  if (!user || loading) {
    // Update to loading spinner later
    return  (
      <div className="loading">
        <RotatingLines
          visible={true}
          height="96"
          width="96"
          strokeColor="grey"
          strokeWidth="5"
          animationDuration=".75"
          ariaLabel="rotating-lines-loading"
          wrapperStyle={{}}
          wrapperClass=""
          />
      </div>
    )
  }
  
  if (!userFound) {
    return (
      <div className="user-not-found">
        <h2>Sorry, this page isn't available.</h2>
        <p>
          The link you followed may be broken, or the page may be removed.
          <Link to='/messages'>Go back to Messages.</Link>
        </p>
      </div>
    )
  }
  
  //console.log('userdata', userData);
  return (
    <div className="profile-container">
      <Link to='/messages'>
        <div className="return">
          <KeyboardBackspaceIcon />
          <span>Return to Messages</span>
        </div>
      </Link>
      <Link to={`/${userData.username}/settings`}>
        <span className="settings-btn">
          <SettingsIcon fontSize="large" />
        </span>
      </Link>
      <img src={`http://localhost:4000/${userData.pfpurl}`} className="profile-picture-lg" />
      <div className="profile-user-info">
        <span className="profile-user-name">{userData.fullName}</span>
        <span className="profile-user-username">@{userData.username}</span>
      </div>
      <div className="profile-tabs">
        <h3 onClick={handleOpen}>Friends List</h3>
        {userData.username === user.username && (
          <h3 onClick={handleOpenRequests}>Requests</h3>
        )}
      </div>
      <Modal
        open={showFriends}
        onClose={handleClose}
      >
        <div>
          <FriendsList setShowFriends={setShowFriends} />
        </div>
      </Modal>
      <Modal
        open={showRequests}
        onClose={handleCloseRequests}
      >
        <div>
          <Requests setShowRequests={setShowRequests} />
        </div>
      </Modal>
      {userData.username === user.username && (
        <div className="profile-logout">
          <Button variant="contained" color="primary" onClick={handleLogout}>Log out</Button>
        </div>
      )}
      {userData.username !== user.username && 
      !userData.friends.find(friend => friend.username === user.username) && 
      (
        <div className="add-friend-btn">
          <button onClick={handleAddFriend} disabled={friendReqSent}>
            {friendReqSent ? "Request Sent!" : "Add Friend"}
          </button>
        </div>
      )}
    </div>
  );
}

export default Profile;