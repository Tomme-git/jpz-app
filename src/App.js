import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Page from './pages/Page';

function App() {
  console.log();
  return (
    <div className="App">
      <h1>Jyllands Park Zoo App</h1>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/page" element={<Page />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
