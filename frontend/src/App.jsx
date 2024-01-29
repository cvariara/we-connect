import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useAuthContext } from "./hooks/useAuthContext";

// pages & components
import Login from './pages/Login';
import Signup from './pages/signup';
import Home from './pages/Home';
import Navbar from './components/Navbar';

function App() {
  const { user } = useAuthContext();

  return (
    <div className='App'>
      <BrowserRouter>
        {user && <Navbar />}
        {!user && <Home />}
        <Routes>
          <Route 
            path='/login' 
            element={<Login />} 
          />
          <Route 
            path='/signup' 
            element={<Signup />} 
          />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
