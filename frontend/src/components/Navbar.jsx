import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick = () => {
    logout();
  }

  return (
    <header>
      <div className="container">
        <nav>
          {/* Link to profile */}
          <div>
            <span>{user.username}</span>
            <button className="logout" onClick={handleClick}>Log out</button>
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Navbar;