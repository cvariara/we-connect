import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from "./hooks/useAuthContext";
import { useEffect, useState } from 'react';

// pages & components
import Login from './pages/Login';
import Signup from './pages/signup';
import Home from './pages/Home';
import Messages from './pages/Messages';
import Profile from './pages/Profile';

function App() {
  const { user } = useAuthContext();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/user/profile/${user.username}`);
        const json = await response.json();

        if (response.ok) {
          console.log('json', json);
          setUserData(json);
        } else {
          console.error("Failed to fetch user profile");
        }
      } catch (error) {
        console.error("Error fetching user profile:", error.message);
      }
    };

    // Ensure user.username is present before making the fetch request
    if (user && user.username) {
      fetchUserData();
    }
  }, [user]);

  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route 
            path='/'
            element={!user ? <Home /> : <Navigate to='/messages' />}
          />
          <Route 
            path='/login' 
            element={!user ? <Login /> : <Navigate to='/messages' />} 
          />
          <Route 
            path='/signup' 
            element={!user ? <Signup /> : <Navigate to='/messages' />} 
          />
          <Route
            path='/messages'
            element={user ? <Messages userData={userData} /> : <Navigate to='/login' />}
          />
          <Route
            path='/profile/:id'
            element={user ? <Profile userData={userData} /> : <Navigate to='/login' />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
