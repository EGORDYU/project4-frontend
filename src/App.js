import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BuildOrderList from './components/BuildOrderList';
import BuildOrderDetails from './components/BuildOrderDetails';
import MakeBO from './components/MakeBO';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BuildOrderList />} />
        <Route path="/buildorders/:id" element={<BuildOrderDetails />} />
        <Route path="/makebo" element={<MakeBO />} />
      </Routes>
    </Router>
  );
}

export default App;
