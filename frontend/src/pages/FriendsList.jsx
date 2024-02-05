import { Link, useParams } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useEffect, useState } from "react";

const FriendsList = () => {
  const { id } = useParams();
  const { user } = useAuthContext();
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/user/profile/${id}/friends`);
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
  }, [user, id])

  console.log(friends);

  return(
    <div>
      <h1>Friends List</h1>
      {friends.map(friend => (
        <li key={friend._id}>
          <Link to={`/${friend.username}/profile`}>
            {friend.firstName} {friend.lastName} - {friend.username}
          </Link>
        </li>
      ))}
    </div>
  )
}

export default FriendsList;