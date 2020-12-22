import React, {useState} from 'react'
import UserAPI from '../api/UserAPI'
import { Redirect } from 'react-router-dom'
import { Button, Form, Label, Input, Col } from 'reactstrap';


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
    <div class="center-login">
      <h1> Sign up for free! </h1>
      <form onSubmit={handleSignup}>
        <div>
          <Label>Create Username:</Label>
          <Input type='text' name='username' />
        </div>
        <div>
          <Label>Create Password:</Label>
          <Input type='password' name='password' />
        </div>
        <br/>
        <Col sm={{ size: 10, offset: 5 }}>
          <Button justify-content="center" type='submit'>Sign Up</Button>
        </Col>
      </form>
    </div>
  )
}

export default SignupPage