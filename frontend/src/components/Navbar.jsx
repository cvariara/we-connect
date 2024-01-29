import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";

const Navbar = () => {
  const { logout } = useLogout();

  const handleClick = () => {
    logout();
  }

  return (
    <header>
      <div className="container">
        <nav>
          {/* Link to profile */}
          <div>
            <button className="logout" onClick={handleClick}>Log out</button>
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Navbar;