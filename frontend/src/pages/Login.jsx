import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login, loading, error } = useLogin();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(username, password);
    console.log(error);
  }

  return (
    <form className="login" onSubmit={handleSubmit}>
      <h3>Log in</h3>

      <div className="form-group">
        <label>Username:</label>
        <input 
          type="text"
          onChange={(e) => setUsername(e.target.value)}
          value={(username)} 
        />
      </div>
      <div className="form-group">
        <label>Password:</label>
        <input 
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={(password)} 
        />
      </div>

      <button disabled={loading}>Log in</button>
      <p>
        New to WeConnect?
        <br />
        <Link to="/signup"><strong>Sign up now</strong></Link>!
      </p>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default Login;