import React from 'react'

const HomePage = (props) => {
  
  if (props.isLoggedIn) {
    return (
      <div>
        <button onClick={props.handleLogout}>Logout</button>
      </div>
    )
  }
  
  return (
    <div>
      <h1> Home Page </h1>
      <div>
        {/* <button onClick={props.handleLogout}>Logout</button> */}
      </div>
    </div>
  )
}

export default HomePage



