import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BuildOrderList from './components/BuildOrderList';
import BuildOrderDetails from './components/BuildOrderDetails';
import MakeBO from './components/MakeBO';
import { Navigation } from './components/partials/navigations';
import {Logout} from './components/logout';
import {Login} from "./components/Login";
import UserPage from './components/UserPage';

function App() {
  return (
    <Router>
      <Navigation></Navigation>
      <Routes>
        <Route path="/" element={<BuildOrderList />} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/users/create" element={<UserPage/>} />
        <Route path="/logout" element={<Logout/>}/>
        <Route path="/buildorders/:id" element={<BuildOrderDetails />} />
        <Route path="/makebo" element={<MakeBO />} />
      </Routes>
    </Router>
  );
}

export default App;
