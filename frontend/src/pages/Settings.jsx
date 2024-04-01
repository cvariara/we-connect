import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import { useEffect, useState } from 'react';


const Settings = () => {
  const { user } = useAuthContext();
  const { id } = useParams();
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [userFound, setUserFound] = useState(true)

  useEffect(() => {
    setUserFound(true);
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/user/profile/${id}`);
        const json = await response.json();

        if (response.ok) {
          console.log(json);
          setFirstName(json.firstName);
          setLastName(json.lastName);
          setUsername(json.username);
          setProfilePicture(json.profilePicture);
          setUserFound(true);
        } else {
          console.error("Failed to fetch user profile");
          setUserFound(false);
        }
      } catch (error) {
        console.error("Error fetching user profile:", error.message);
        setUserFound(false);
      }
    };

    // Ensure user.username is present before making the fetch request
    if (user && user.username && id) {
      fetchUserData();
    }
  }, [user, id])

  const handleUpdate = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("username", username);
    formData.append("profilePicture", profilePicture);
  
    try {
      const response = await fetch(`http://localhost:4000/api/user/profile/${user._id}`, {
        method: 'PUT',
        body: formData,
      });
  
      const json = await response.json();
  
      if (response.ok) {
        // Handle success case, such as displaying a success message
        console.log('User profile updated successfully');
        navigate(`/${username}/profile`); // Redirect to the user's profile page
      } else {
        // Handle error case
        console.error('Failed to update user profile:', json.error);
      }
    } catch (error) {
      console.error('Error updating user profile:', error.message);
    }
  }

  const handleCancel = (e) => {
    e.preventDefault();

    navigate(`/${user.username}/profile`);
  }

  if (!user || !userFound) {
    return (
      <div className="user-not-found">
        <h2>Sorry, this page isn't available.</h2>
        <p>
          The link you followed may be broken, or the page may be removed. 
          <Link to={`/${id}/profile`}> Go back to Profile.</Link>
        </p>
      </div>
    )
  }

  return (
    <div id='settings'>
      <Link to={`/${id}/profile`}>
        <div className="return">
          <KeyboardBackspaceIcon />
          <span>Return to Profile</span>
        </div>
      </Link>
      <h1>Settings</h1>
      <form action="" className='update-profile-form'>
        <div className="update update-pfp">
          <img 
            src={`http://localhost:4000/images/${profilePicture}`} 
            className='update-pfp-img'
          />
          <span>
            <PhotoCameraIcon />
            <p>Change</p>
            <input 
              type="file"
              onChange={(e) => setProfilePicture(e.target.files[0])}
              name="profilePicture"
              id='file_up'
            />
          </span>
        </div>
        <div className="update update-username form-group">
          <label htmlFor="">Username:</label>
          <input 
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="update update-name">
          <div className="form-group">
            <label htmlFor="">First Name:</label>
            <input 
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="">Last Name:</label>
            <input 
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
        </div>
        <div className="update update-btns">
          <button onClick={handleUpdate}>Apply</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </div>
  )
}

export default Settings