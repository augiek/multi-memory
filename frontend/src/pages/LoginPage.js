import React from 'react'
import {Link, Redirect} from 'react-router-dom'
import { Button } from 'reactstrap';



const LoginPage = (props) => {
  console.log(props)

  if (props.isLoggedIn) {
    return (
      <div class='Page-body'>
        <Button onClick={props.handleLogout}>Logout</Button>
        {/* <Redirect to='/'></Redirect> */}
      </div>
    )
  }

  return (
    <div>
      <h1> Login Page </h1>
      <form onSubmit={props.handleLogin}>
        <label>Username:</label>
        <input type='text' placeholder='Username' name='username' />
        <label>Password:</label>
        <input type='password' name='password' />
        <button type='submit'>Login</button>
      </form>
      <div>
        <Link to='/'>Home</Link>
      </div>
      <div>
        <Link to='/signup'>Signup</Link>
      </div>
    </div>
  )
}

export default LoginPage