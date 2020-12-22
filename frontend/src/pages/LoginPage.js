import React from 'react'
import {Link, Redirect} from 'react-router-dom'
import { Button, Form, Label, Input, Col } from 'reactstrap';



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
    <div class="center-login">
      <h1> Log in to start recording </h1>
      <Form onSubmit={props.handleLogin}>
        <div>
          <Label>Username:</Label>
          <Input type='text' placeholder='Username' name='username' />
        </div>
        <div>
          <Label>Password:</Label>
          <Input type='password' name='password' />
        </div>
        <br/>
        <Col sm={{ size: 10, offset: 5 }}>
          <Button justify-content="center" type='submit'>Login</Button>
        </Col>
      </Form>
      {/* <div>
        <Link to='/'>Home</Link>
      </div> */}
      {/* <Col sm={{ size: 10, offset: 5 }}>
        <Link to='/signup'>Signup</Link>
      </Col> */}
    </div>
  )
}

export default LoginPage