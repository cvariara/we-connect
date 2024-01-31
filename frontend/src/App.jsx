import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from "./hooks/useAuthContext";

// pages & components
import Login from './pages/Login';
import Signup from './pages/signup';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Messages from './pages/Messages';

function App() {
  const { user } = useAuthContext();

  return (
    <div className='App'>
      <BrowserRouter>
        {user && <Navbar />}
        {/* {!user && <Home />} */}
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
            element={user ? <Messages user={user} /> : <Navigate to='/login' />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
