import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, BrowserRouter } from 'react-router-dom';
import RegistrationForm from './components/Registration';
import LoginForm from './components/Login';
import { HomePage, DataPage } from './components/Home';
import  './App.css';
import AddMachine from './components/AddMachine';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleRegistration = () => {
    setIsRegistered(true);
  };

  return (
    // <Router>
    //   <div className="App">
    //     <Routes>
    //       <Route
    //         path="/register"
    //         element={isRegistered ? <Navigate to="/login" /> : <RegistrationForm onRegister={handleRegistration} />}
    //       />
    //       <Route
    //         path="/login"
    //         element={
    //           isLoggedIn ? (
    //             <Navigate to="/home" />
    //           ) : isRegistered ? (
    //             <LoginForm onLogin={handleLogin} />
    //           ) : (
    //             <Navigate to="/register" />
    //           )
    //         }
    //       />
    //       <Route path="/home" element={isLoggedIn ? <HomePage /> : <Navigate to="/login" />} />
    //       <Route path="/" element={<Navigate to="/login" />} />
    //     </Routes>   
    //   </div>
    // </Router>
    <BrowserRouter>
    <Routes>
     <Route path='/home' element={<HomePage/>}></Route>  
     <Route path="/data/:machineId" element={<DataPage />} />
     <Route path='/' element={<RegistrationForm/>}></Route> 
     <Route path='/login' element={<LoginForm/>}></Route>  
     <Route path='/add-machine' element={<AddMachine/>}></Route>  
    </Routes></BrowserRouter>
  );
}

export default App;
