import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import AppNav from './components/AppNav/AppNav.js';
import HomePage from './pages/HomePage.js';
import LoginPage from './pages/LoginPage.js';
import SignupPage from './pages/SignupPage.js';
import NewEntryPage from './pages/NewEntryPage.js';
import AccountPage from './pages/AccountPage.js';
import ArchivePage from './pages/ArchivePage.js';
import UserAPI from './api/UserAPI';


function App() {
  const [user, setUser] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    getUser()
  }, [])

  const getUser = async () => {
    if (localStorage.getItem('auth-user') !== null) {
      let response = await UserAPI.getLoggedInUser(localStorage.getItem('auth-user'))
      let data = await response.json()
      if (data.username) {
        setIsLoggedIn(true)
        setUser(data)
      }
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    let userCredentials = {
      username: event.target.username.value,
      password: event.target.password.value
    }
    let response = await UserAPI.login(userCredentials)
    let data = await response.json()
    if (data.token) {
      localStorage.setItem('auth-user', data.token)
      setIsLoggedIn(true)
      setUser(data.user)
    }
  }

  const handleLogout = () => {
    localStorage.setItem('auth-user', null)
    setIsLoggedIn(false)
    setUser(null)
  }

  const renderLogInPage = () => {
    return (
      <LoginPage
        isLoggedIn={isLoggedIn}
        user={user}
        handleLogin={handleLogin}
        handleLogout={handleLogout}
      />
    )
  }

  return (
    <div className="App">
      <AppNav />
        <BrowserRouter>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/login" render={renderLogInPage} />
            <Route exact path="/signup" component={SignupPage} />
            <Route exact path="/new" component={NewEntryPage} />
            <Route exact path="/account" component={AccountPage} />
            <Route exact path="/archive" component={ArchivePage} />
        </BrowserRouter>
      </div>
  );
}

export default App;
