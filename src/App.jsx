import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom'
import Header from './components/Header';
import "./App.css";
import HomePage from './Pages/HomePage.jsx';

function App() {
  
  return (
    <BrowserRouter>
      <div>
        <Header />
        <Route path='/' component={HomePage}/>

      </div>
    </BrowserRouter>
  )
}

export default App
