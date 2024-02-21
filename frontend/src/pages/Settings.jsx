import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import { useEffect, useState } from 'react';

const Settings = () => {
  const { user } = useAuthContext();
  const [userData, setUserData] = useState(null);
  const [userFound, setUserFound] = useState(true)

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/user/profile/${user.username}`);
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
  }, [user])

  if (!userFound) {
    return (
      <div className="user-not-found">
        <h2>Sorry, this page isn't available.</h2>
        <p>
          The link you followed may be broken, or the page may be removed.
          <Link to={`/${user.username}/profile`}>Go back to Profile.</Link>
        </p>
      </div>
    )
  }

  return (
    <div id='settings'>
      <Link to={`/${user.username}/profile`}>
        <div className="return">
          <KeyboardBackspaceIcon />
          <span>Return to Profile</span>
        </div>
      </Link>
      <h1>Settings</h1>
      <form action="">

      </form>
    </div>
  )
}

export default Settings