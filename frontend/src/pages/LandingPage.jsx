import { Link } from "react-router-dom";
import { RotatingLines } from 'react-loader-spinner';
import Navbar from "../components/Navbar";

const LandingPage = ({ userData }) => {

  if (!userData) {
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
        <p>Select a friend who you would like to message</p>
      </div>
    </div>
  )
}

export default LandingPage;