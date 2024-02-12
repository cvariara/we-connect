import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";
import { RotatingLines } from "react-loader-spinner";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { Button, Modal } from "@mui/material";
import FriendsList from "../components/FriendsList";

const Profile = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const { id } = useParams();

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userFound, setUserFound] = useState(true);
  const [showFriends, setShowFriends] = useState(false);

  const handleLogout = () => {
    logout();
  }

  const handleOpen = () => setShowFriends(true);
  const handleClose = () => setShowFriends(false);

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
    if (user && user.username && id) {
      fetchUserData();
    }
  }, [user, id]);

  if (loading) {
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

  return (
    <div className="profile-container">
      <Link to='/messages'>
        <div className="return">
          <KeyboardBackspaceIcon />
          <span>Return to Messages</span>
        </div>
      </Link>
      <img src={userData.profilePicture} className="profile-picture-lg" />
      <div className="profile-user-info">
        <span className="profile-user-name">{userData.fullName}</span>
        <span className="profile-user-username">@{userData.username}</span>
      </div>
      <div className="profile-friends">
        <h3 onClick={handleOpen}>Friends List</h3>
      </div>
      <Modal
        open={showFriends}
        onClose={handleClose}
      >
        <div>
          <FriendsList setShowFriends={setShowFriends} />
        </div>
      </Modal>
      {userData.username === user.username && (
        <div className="profile-logout">
          <Button variant="contained" color="primary" onClick={handleLogout}>Log out</Button>
        </div>
      )}
    </div>
  );
}

export default Profile;