import { Link, useParams } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useState } from "react";

const AddUser = () => {
  const { user } = useAuthContext();
  const { id } = useParams();
  const [friendUsername, setFriendUsername] = useState('');
  const [error, setError] = useState(null);
  const [sent, setSent] = useState(null);

  const handleClick = async (e) => {
    e.preventDefault();
    setError(null);
    setSent(null);

    try {
      const response = await fetch(`/api/friendship/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          senderID: user.username,
          receiverID: friendUsername
        })
      });

      const json = await response.json();

      if (response.ok) {
        console.log('Friend req sent!')
        setSent("Friend request sent!")
      }

      if (!response.ok) {
        setError(json.error);
      }
    } catch (error) {
      console.error('Error adding user:', error.message);
      setError(error.message)
    }
  }

  if (!user || user.username !== id) {
    return (
      <div className="user-not-found">
        <h2>Sorry, this page isn't available.</h2>
        <p>
          The link you followed may be broken, or the page may be removed. 
          <Link to={`/messages`}> Go back to Messages.</Link>
        </p>
      </div>
    )
  }

  return (
    <div className="add-user">
      <h1>Add User</h1>
      <form action="" className="add-user-form">
        <input 
          type="text" 
          name="" 
          id=""
          placeholder="Enter username..."
          value={friendUsername}
          onChange={(e) => setFriendUsername(e.target.value)}
        />
        <button onClick={handleClick}>Add</button>
      </form>
      {error && <div className="error">
        {error}
      </div>}
      {sent && <div className="error">
        {sent}
      </div> }
    </div>
  )
};

export default AddUser;