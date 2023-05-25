import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Homepage from './pages/Homepage';
import Wallet from './pages/Wallet';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/projects/jpz-app/" element={<Homepage />} />
          <Route path="/projects/jpz-app/wallet" element={<Wallet />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
