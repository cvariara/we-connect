import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from "./hooks/useAuthContext";
import { useEffect, useState } from 'react';
import { RotatingLines } from 'react-loader-spinner';

// pages & components
import Login from './pages/Login';
import Signup from './pages/signup';
import Home from './pages/Home';
import Messages from './pages/Messages';
import Profile from './pages/Profile';

function App() {
  const { user } = useAuthContext();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

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
      } finally {
        setLoading(false);
      }
    };

    // Ensure user.username is present before making the fetch request
    if (user && user.username) {
      fetchUserData();
    }
  }, [user]);

  if (loading) {
    // Update to loading spinner later
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
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route 
            path='/'
            element={!user ? <Home /> : <Navigate to='/profile/:id' />}
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
            path='/profile/:id'
            element={user ? <Profile /> : <Navigate to='/login' />}
          />
          <Route
            path='/messages'
            element={user ? <Messages userData={userData} /> : <Navigate to='/login' />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
