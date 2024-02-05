import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";
import { RotatingLines } from "react-loader-spinner";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

const Profile = () => {
  const { user } = useAuthContext();
  const { id } = useParams();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userFound, setUserFound] = useState(true);
  const { logout } = useLogout();

  const handleClick = () => {
    logout();
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
        <span className="profile-user-username">{userData.username}</span>
      </div>
      <div className="profile-friends">
        <Link to={`/${userData.username}/friends`}>
          <h3>Friends List</h3>
        </Link>
      </div>
      {userData.username === user.username && (
        <div className="profile-logout">
          <button className="logout" onClick={handleClick}>Log out</button>
        </div>
      )}
    </div>
  );
}

export default Profile;