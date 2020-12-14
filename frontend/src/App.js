import './App.css';
import React, { Component, useState, userEffect } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import HomePage from './pages/HomePage.js';
import LoginPage from './pages/LoginPage.js';
import SignupPage from './pages/SignupPage.js';


function App() {
  const [user, setUser] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <div className="App">
        <BrowserRouter>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/signup" component={SignupPage} />
        </BrowserRouter>
      </div>
  );
}

export default App;
