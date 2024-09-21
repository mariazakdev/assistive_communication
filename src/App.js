import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from './Components/Header/Header';

import './App.scss'; 
import HomePage from './Pages/HomePage';
import ChoicesPage from './Pages/ChoicesPage';

function App() {
  return (
    <div className="app">
      <Router> {/* Ensure Router wraps everything */}
        <Header /> {/* NavLink inside Header needs to be inside Router */}
        <Routes>
          <Route path="/songs" element={<HomePage />} />
          <Route path="/choices" element={<ChoicesPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
