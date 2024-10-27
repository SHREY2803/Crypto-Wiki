import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Updated import
import Header from './components/Header';
import './App.css';
import HomePage from './Pages/HomePage.jsx';
import { makeStyles } from '@mui/styles';
import CoinsPage from './Pages/CoinsPage.jsx';

const useStyles = makeStyles(() => ({
  App: {
    backgroundColor: "#14161a",
    color: "white",
    minHeight: "100vh",
  },
}));

function App() {
  const classes = useStyles();

  return (
    <BrowserRouter>
      <div className={classes.App}>
        <Header />
        <Routes> 
          <Route path="/" element={<HomePage />} /> 
          <Route path="/coins/:id" element={<CoinsPage />} /> 
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
