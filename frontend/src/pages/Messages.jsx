import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const Messages = ({ userData }) => {
  if (!userData) {
    return <p>Loading...</p>
  }

  return (
    <div className="messages-container">
      <Navbar userData={userData} />
      <h1>Messages List</h1>
      <h2>{userData.username}</h2>
    </div>
  )
}

export default Messages;