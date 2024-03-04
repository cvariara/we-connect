import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import { Button } from "@mui/material";

const Navbar = ({ userData }) => {
  const { logout } = useLogout();

  const handleClick = () => {
    logout();
  }

  console.log(userData.pfpurl)

  return (
    <header>
      <div className="nav">
        <nav>
          <div className="profile-link">
            <Link to={`/${userData.username}/profile`}>
              <img className="profile-picture-sm" src={`http://localhost:4000/${userData.pfpurl}`} alt="" />
              <span>@{userData.username}</span>
            </Link>
          </div>
          <div>
            <Button variant="contained" color="primary" onClick={handleClick}>Log out</Button>
            {/* <button className="logout" onClick={handleClick}>Log out</button> */}
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Navbar;