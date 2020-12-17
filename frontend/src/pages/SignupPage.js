import React, {useState} from 'react'
import UserAPI from '../api/UserAPI'
import { Redirect } from 'react-router-dom'

const SignupPage = () => {
  const [redirect, setRedirect] = useState(false)

  const handleSignup = async (event) => {
    event.preventDefault()
    let userCredentials = {
      username: event.target.username.value,
      password: event.target.password.value
    }
    let response = await UserAPI.signupUser(userCredentials)
    let data = await response.json()
    console.log(data);
    if (data) {
      setRedirect(true)
    }
  }

  if (redirect) {
    return (
      <Redirect to='/' />
    )
  }
  
  return (
    <div>
      <h1> Signup Page </h1>
      <form onSubmit={handleSignup}>
        <label>Create Username:</label>
        <input type='text' placeholder='Username' name='username' />
        <label>Create Password:</label>
        <input type='password' name='password' />
        <button type='submit'>Sign Up</button>
      </form>
    </div>
  )
}

export default SignupPage