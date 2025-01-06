import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/header';
import Gallery from './components/gallery';
import Login from './components/login';
import SignUp from './components/signup';
import Logo from './components/logoslider';
import RegistrationPage from './components/registration';
import NoteForYOU from './components/notforyou';
import Footer from './components/footer';

const App = () => {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path="/reactapp" element={<Logo />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/registration" element={< RegistrationPage />} />
        <Route path="/7qx3vz9k2p8yj4l6r" element={<NoteForYOU/>} />
      </Routes>
      <Footer/>
    </Router>
  );
};

export default App;
