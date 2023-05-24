import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BuildOrderList from './components/BuildOrderList';
import BuildOrderDetails from './components/BuildOrderDetails';
import MakeBO from './components/MakeBO';
import { Navigation } from './components/partials/navigations';
import { Logout } from './components/logout';
import { Login } from "./components/Login";
import UserPage from './components/UserPage';
import AboutMe from './components/partials/AboutMe';
import Footer from './components/partials/Footer';
import './App.css';

function App() {
  return (
    <div className="app-container" style={{ backgroundColor: '#d5cbae', minHeight: '100vh' }}>
      <Router>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <div style={{ width: '60%' }}>
            <Navigation />
          </div>
          <div style={{ width: '60%'}}>
            <Routes>
              <Route path="/" element={<BuildOrderList />} />
              <Route path="/login" element={<Login />} />
              <Route path="/users/create" element={<UserPage />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/buildorders/:id" element={<BuildOrderDetails />} />
              <Route path="/makebo" element={<MakeBO />} />
            </Routes>
          </div>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
