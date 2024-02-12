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

const Requests = ({ setShowRequests }) => {
  const { id } = useParams();
  const { user } = useAuthContext();
  const [requests, setRequests] = useState([]);

  const handleAcceptingRequest = async (friendID) => {
    try {
      const response = await fetch(`http://localhost:4000/api/friendship/${friendID}/accept`, {
        method: 'POST'
      });

      if (response.ok) {
        setShowRequests(false);
        console.log('Friend Added!');
      } else {
        console.error('Failed to accept friend request');
      }
    } catch (error) {
      console.error('Error accepting friend request');
    }
  }

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/friendship/pending-requests/${id}`);
        const json = await response.json();

        if (response.ok) {
          //console.log(json)
          setRequests(json.pending || []);
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

  console.log(requests);

  return (
    <div className="friends-list">
      <Box sx={style}>
        <div className="friends-list-nav">
          <span>Friend Requests</span>
          <CloseIcon onClick={() => setShowRequests(false)} />
        </div>
        {requests.map(request => (
          <li key={request._id}>
            {request.sender.firstName} {request.sender.lastName} - {request.sender.username}
            <button onClick={() => handleAcceptingRequest(request._id)}>Accept</button>
          </li>
        ))}
      </Box>
    </div>
  );
}

export default Requests;