import { Link } from "react-router-dom";

const Home = () => {

  return (
    <div className="home">
      <nav>
        <h1>WeConnect</h1>
        <div className="links">
          <Link to="/login">Log in</Link>
          <Link to="/signup">Sign up</Link>
        </div>
      </nav>
      <div className="about">
        <h2>Connect with your friends</h2>
        <p>Start lively conversations with your pals in style</p>
        <Link to="/signup">Get Started</Link>
      </div>
    </div>
  )
}

export default Home;