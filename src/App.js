import './App.css';
import { Routes, Route, useNavigate } from 'react-router-dom'
import Home from './pages/Home'
import LogIn from './pages/LogIn'
import SignUp from './pages/SignUp'
import Contact from './pages/Contact'
import About from './pages/About'
import Navbar from './components/common/Navbar';
import OpenRoute from './components/core/Auth/OpenRoute';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getCurrentUser } from './services/operations/profileServices';
import { useDispatch } from 'react-redux';
import VerifyEmail from './pages/VerifyEmail';

function App() {

  const { token } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      getCurrentUser(token, dispatch, navigate);
    }
  }, []);


  return (
    <div className="bg-richblack-900 min-h-screen flex flex-col font-inter">
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route
          path='/login'
          element={
            <OpenRoute>
              <LogIn />
            </OpenRoute>
          } />
        <Route path='/contact' element={<Contact />} />
        <Route path='/about' element={<About />} />
        <Route path='/signup' element={
          <OpenRoute>
            <SignUp />
          </OpenRoute>
        } />

        <Route
          path='verify-email'
          element={
            <OpenRoute>
              <VerifyEmail />
            </OpenRoute>
          }
        />

        <Route path="*" element={<p className='text-white' >Page Not Found</p>} />
      </Routes>
    </div>
  );
}

export default App;
