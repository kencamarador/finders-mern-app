import {BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext';

//pages and components
import Home from './pages/Home';
import Navbar from './components/Navbar';
import AddJob from './pages/AddJob';
import { Box, Container, Stack } from "@mui/material"
import Sidebar from './components/SideBar';
import JobSelectOne from './components/JobSelectOne';
import Profile from './pages/Profile';
import LandingPage from './pages/LandingPage';
import SharedPage from './pages/SharedPage';
import Register from './pages/Register';
import SignIn from './pages/SignIn';




function App() {
  const { user } = useAuthContext()
  return (
    <>
  
        <BrowserRouter>
              <Routes>
                <Route
                path='/'
                element={
                  <SharedPage/>
                }
                >
                <Route path="api/jobs/:id" element={<JobSelectOne />} />
                <Route path="" element={user ? <Home/> : <Navigate to="/login"/>} />
                <Route path="create" element={<AddJob />} />
                <Route path="profile" element={user ? <Profile /> : <Navigate to="/login"/>} />

                </Route>

                <Route path="/home" element={<LandingPage />} />
                <Route path="/register" element={!user ? <Register /> : <Navigate to="/"/>} />
                <Route path="/login" element={!user ? <SignIn /> : <Navigate to="/"/>} /> 
                <Route path="/shared" element={<SharedPage />} /> //testing
           


              </Routes>
        

        </BrowserRouter>
    
    </>
  );
}



export default App;
