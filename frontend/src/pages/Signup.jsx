import { useState } from "react";
import { useSignup } from "../hooks/useSignup";

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  const { signup, loading, error } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await signup(firstName, lastName, username, email, password, profilePicture);
  }

  return (
    <form className="signup" onSubmit={handleSubmit}>
      <h3>Sign up</h3>

      <div className="form-group">
        <label>First Name:</label>
        <input 
          type="text"
          onChange={(e) => setFirstName(e.target.value)}
          value={(firstName)} 
        />
      </div>
      <div className="form-group">
        <label>Last Name:</label>
        <input 
          type="text"
          onChange={(e) => setLastName(e.target.value)}
          value={(lastName)} 
        />
      </div>
      <div className="form-group">
        <label>Username:</label>
        <input 
          type="text"
          onChange={(e) => setUsername(e.target.value)}
          value={(username)} 
        />
      </div>
      <div className="form-group">
        <label>Email:</label>
        <input 
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={(email)} 
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
      <div className="form-group">
        <label>Profile Picture:</label>
        <input 
          type="file"
          onChange={(e) => setProfilePicture(e.target.value)}
          value={(profilePicture)} 
        />
      </div>   

      <button disabled={loading}>Sign up</button>
      {error && <div className="error">
        {error}
      </div>}
    </form>
  )
}

export default Signup;