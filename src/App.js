import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Yearcards from './pages/Yearcards';
import Wallet from './pages/Wallet';
import Location from './pages/Location';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/projects/jpz-app/" element={<Yearcards />} />
          <Route path="/projects/jpz-app/wallet" element={<Wallet />} />
          <Route path="/projects/jpz-app/location" element={<Location />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
