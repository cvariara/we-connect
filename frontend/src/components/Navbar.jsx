import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

const Navbar = ({ userData }) => {
  const { logout } = useLogout();

  const handleClick = () => {
    logout();
  }

  return (
    <header>
      <div className="container">
        <nav>
          <Link to={`/${userData.username}/profile`}>
            <img className="profile-picture-sm" src={userData.profilePicture} alt="" />
            <span>{userData.username}</span>
          </Link>
          <div>
            <button className="logout" onClick={handleClick}>Log out</button>
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Navbar;