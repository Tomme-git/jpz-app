import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Homepage from './pages/Homepage';
import Wallet from './pages/Wallet';
import Location from './pages/Location';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/projects/jpz-app/" element={<Homepage />} />
          <Route path="/projects/jpz-app/wallet" element={<Wallet />} />
          <Route path="/projects/jpz-app/location" element={<Location />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
