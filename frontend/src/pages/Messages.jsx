import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { RotatingLines } from 'react-loader-spinner';
import Navbar from "../components/Navbar";

const Messages = ({ userData }) => {
  const { receiverID } = useParams();
  const messagesEndRef = useRef(null);

  const [messages, setMessages] = useState([]);
  const [receiverInfo, setReceiverInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/messages/${receiverID}?senderID=${userData._id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            // Add authentication headers if needed
          },
        });
        const json = await response.json();

        if (response.ok) {
          setMessages(json.messages)
        } else {
          console.error('Failed to fetch messages');
        }
      } catch (error) {
        console.error('Failed to fetch messages: ', error.error);
      } finally {
        setLoading(false);
      }
    }
    if (receiverID) {
      fetchMessages();
    }
  }, [receiverID]);

  useEffect(() => {
    const fetchReceiverInfo = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/user/profile/${receiverID}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            // Add authentication headers if needed
          },
        });
        const json = await response.json();

        if (response.ok) {
          setReceiverInfo(json);
        } else {
          console.error('Failed to fetch receiver username');
        }
      } catch (error) {
        console.error('Failed to fetch receiver username: ', error.error);
      }
    }

    if (receiverID) {
      fetchReceiverInfo();
    }
  }, [receiverID]);

  useEffect(() => {
    // After messages are fetched or updated, scroll to the bottom
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "auto", block: "end" });
    }
  }, [messages]);

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
    <div className="messages-container">
      <Navbar userData={userData} />
      <div className="message-container">
        <div className="">
          <Link to={`/${receiverInfo.username}/profile`} className="receiver-info">
            <img className="profile-picture-sm" src={receiverInfo.profilePicture} alt="" />
            <h5>{receiverInfo.fullName}</h5>
          </Link>
        </div>
        <div className="messages">
          {messages.length > 0 ? messages.map((message, index) => (
            <div key={index} className={message.sender.username === userData.username ? 'sender message-bubble' : 'receiver message-bubble'}>
              <p>{message.content}</p>
            </div>
          )) :
            <p>You have no message with {receiverInfo.username}</p>
          }
          <div ref={messagesEndRef} />
        </div>
        <form action="" method="post" className="send-text">
          <div className="message-text">
            <input type="text" />
          </div>
          <button>Send</button>
        </form>
      </div>
    </div>
  )
}

export default Messages;