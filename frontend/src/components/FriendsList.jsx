import { Link, useParams } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  height: 500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 2,
};

const FriendsList = ({ setShowFriends }) => {
  const { id } = useParams();
  const { user } = useAuthContext();
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await fetch(`/api/user/profile/${id}/friends`);
        const json = await response.json();

        if (response.ok) {
          console.log(json)
          setFriends(json || []);
        } else {
          console.error("Failed to fetch user profile");
        }
      } catch (error) {
        console.error("Error fetching user profile:", error.message);
      }
    };

    // Ensure user.username is present before making the fetch request
    if (user && user.username) {
      fetchFriends();
    }
  }, [user, id]);

  //console.log(friends);

  return(
    <div className="friends-list">
      <Box sx={style}>
        <div className="friends-list-nav">
          <span>Friends</span>
          <CloseIcon onClick={() => setShowFriends(false)} />
        </div>
        {friends.map(friend => (
          <li key={friend._id}>
            <Link to={`/${friend.username}/profile`} onClick={() => setShowFriends(false)}>
              <img src={`https://we-connect-gf8s.onrender.com/${friend.pfpurl}`} alt="" className="profile-picture-xs" />
              <span>{friend.username}</span>
            </Link>
          </li>
        ))}
      </Box>
    </div>
  )
}

export default FriendsList;