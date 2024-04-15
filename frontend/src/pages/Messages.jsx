import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { RotatingLines } from 'react-loader-spinner';
import SendIcon from '@mui/icons-material/Send';
import { io } from "socket.io-client";

import Navbar from "../components/Navbar";

const Messages = ({ userData }) => {
  const { receiverID } = useParams();
  const messagesEndRef = useRef(null);

  const [messages, setMessages] = useState([]);
  const [receiverInfo, setReceiverInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const socket = useRef();

  useEffect(() => {
    socket.current = io("https://we-connect-gf8s.onrender.com");

    socket.current.on("getMessage", data => {
      setArrivalMessage({
        sender: data.senderId,
        receiver: data.receiverId,
        content: data.content,
        timestamp: Date.now(),
      })
    })
  }, []);

  useEffect(() => {
    arrivalMessage && 
      (receiverInfo._id === arrivalMessage.sender || userData._id === arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage])
  
  useEffect(() => {
    socket.current.emit("addUser", userData._id);
    socket.current.on("getUsers", users => {
      console.log(users);
    })
  }, [userData]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(`/api/messages/${receiverID}?senderID=${userData._id}`, {
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
        const response = await fetch(`/api/user/profile/${receiverID}`);
        const json = await response.json();

        if (response.ok) {
          console.log(json)
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
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    socket.current.emit("sendMessage", {
      senderId: userData._id,
      receiverId: receiverInfo._id,
      content: message
    });
    
    try {
      const response = await fetch(`/api/messages/${receiverID}`, {
        method: 'POST',
        body: JSON.stringify({
          senderID: userData._id,
          content: message
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const json = await response.json();

      if (!response.ok) {
        console.error(json.error);
      }

      if (response.ok) {
        setMessage('');
        console.log('new message', json.message);
        console.log(json.message.sender)
        setMessages([...messages, json.message]);
      }
    } catch (error) {
      console.error(error.message)
    }
  }

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
            <img className="profile-picture-sm" src={`http://localhost:4000/${receiverInfo.pfpurl}`} alt="" />
            <h5>{receiverInfo.fullName}</h5>
          </Link>
        </div>
        <div className="messages">
        {messages.length > 0 ? messages.map((msg, index) => (
          <div key={index} className={msg.sender.username === userData.username 
                                      || msg.sender === userData._id ? 
                                      'sender message-bubble' : 'receiver message-bubble'}>
            <p>{msg.content}</p>
          </div>
        )) :
          <p>You have no messages with {receiverInfo.username}</p>
        }
          <div ref={messagesEndRef} />
        </div>
        <form className="send-text" onSubmit={handleSubmit}>
          <div className="message-text">
            <input 
              type="text" 
              placeholder="Type a message" 
              onChange={(e) => setMessage(e.target.value)}
              value={message}
            />
          </div>
          <button>
            <SendIcon />
          </button>
        </form>
      </div>
    </div>
  )
}

export default Messages;