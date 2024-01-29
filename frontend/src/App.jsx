import { BrowserRouter, Routes, Route } from 'react-router-dom';

// pages & components
import Login from './pages/Login';
import Signup from './pages/signup';
import Navbar from './components/Navbar';

function App() {

  return (
    <div className='App'>
      <BrowserRouter>
        <Navbar />
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
