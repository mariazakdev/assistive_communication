import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Components/Header/Header';
import './App.scss';
import HomePage from './Pages/HomePage';
import ChoicesPage from './Pages/ChoicesPage';
import DrawPage from './Pages/DrawPage';

function App() {
  return (
    <Router> {/* Router wraps everything */}
      <div className="app">
        <Header />
        <Routes>
          <Route path="/songs" element={<HomePage />} />
          <Route path="/choices" element={<ChoicesPage />} />
          <Route path="/draw" element={<DrawPage />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
