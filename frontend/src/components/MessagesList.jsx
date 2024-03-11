import { useEffect, useState } from "react";
import { RotatingLines } from 'react-loader-spinner';
import AddIcon from '@mui/icons-material/Add';
import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

const MessagesList = () => {
  const { user } = useAuthContext();
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/user/profile/${user.username}/friends`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            // Add authentication headers if needed
          }
        });
        const json = await response.json();
        if (response.ok) {
          setFriends(json || []);
        } else {
          console.error("Failed to fetch friends");
        }
      } catch (error) {
        console.error("Error fetching friends:", error.message);
      } finally {
        setLoading(false);
      }
    };

    if (user && user.username) {
      fetchFriends();
    }
  }, [user, user.username]);

  if (loading) {
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

  return (
    <div className="message-list">
      <div className="messages-nav">
        <Link to="/messages">
          <h1>Messages</h1>
        </Link>
        <Link to={`/${user.username}/add`}>
          <AddIcon />
        </Link>
      </div>
      <div>
        {friends && friends.length > 0 ? (
          friends.map((friend, index) => (
            <div key={index} className="message-list-friend">
              <Link to={`/messages/${friend.username}`}>
                <h3>{friend.username}</h3>
              </Link>
            </div>
          ))
        ) : (
          <p>No friends found.</p>
        )}
      </div>
    </div>
  );
};

export default MessagesList;
