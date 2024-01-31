import { Link } from "react-router-dom";

const Home = () => {

  return (
    <div className="home">
      <Link to="/login">Log in</Link>
      <Link to="/signup">Sign up</Link>
    </div>
  )
}

export default Home;