import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Components/Header/Header';
import './App.scss';
import HomePage from './Pages/HomePage';
import ChoicesPage from './Pages/ChoicesPage';
import DrawPage from './Pages/DrawPage';
import DragPage from './Pages/DragPage';
import PutInItemPage from './Pages/PutInItemPage';

function App() {
  return (
    <Router> {/* Router wraps everything */}
      <div className="app">
        <Header />
        <Routes>
          <Route path="/songs" element={<HomePage />} />
          <Route path="/choices" element={<ChoicesPage />} />
          <Route path="/draw" element={<DrawPage />} />
          <Route path="/drag" element={<DragPage />} />
          <Route path="/put-in" element={<PutInItemPage />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
