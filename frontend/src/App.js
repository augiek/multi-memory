import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import AppNav from './components/AppNav/AppNav.js';
import HomePage from './pages/HomePage.js';
import LoginPage from './pages/LoginPage.js';
import SignupPage from './pages/SignupPage.js';
import NewEntryPage from './pages/NewEntryPage.js';
import FamilyTreePage from './pages/FamilyTreePage.js';
import ArchivePage from './pages/ArchivePage.js';
import EntryDetailPage from './pages/EntryDetailPage.js'
import EditEntryPage from './pages/EditEntryPage.js'
import MemberDetailPage from './pages/FamilyTreePage.js';
import NewGroupPage from './pages/NewGroupPage.js';
import GroupDetailPage from './pages/GroupDetailPage.js'
import EditGroupPage from './pages/EditGroupPage.js'
import EditMemberPage from './pages/EditMemberPage.js'
import NewMemberPage from './pages/NewMemberPage.js'
import UserAPI from './api/UserAPI';

{/* <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"
  integrity="sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA=="
  crossorigin="">
</script> */}

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
            <Route exact path="/groups" component={FamilyTreePage} />
            <Route exact path="/archive" component={ArchivePage} />
            <Route exact path="/archive/entry/:id(\d+)" component={EntryDetailPage} />
            <Route exact path="/archive/entry/:id(\d+)/edit" component={EditEntryPage} />

            {/* <Route exact path="/groups/new" component={NewGroupPage} />
            <Route exact path="/groups/:id(\d+)/edit" component={EditGroupPage} />
            <Route exact path="/groups/:id(\d+)" component={GroupDetailPage} />
            <Route exact path="/groups/:id(\d+)/:id(\d+)" component={MemberDetailPage} />
            <Route exact path="/groups/:id(\d+)/:id(\d+)/edit" component={EditMemberPage} />
            <Route exact path="/groups/:id(\d+)/new" component={NewMemberPage} /> */}
        </BrowserRouter>
      </div>
  );
}

export default App;
