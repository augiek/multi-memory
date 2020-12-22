const BASE_URL = 'http://localhost:8000/';

const login = async (userCredentials) => {
  let response = await fetch(`${BASE_URL}token-auth/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userCredentials)
  })
  return response
}

const getLoggedInUser = async (token) => {
  let response = await fetch(`${BASE_URL}journal/current_user`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `JWT ${token}` 
    },
  })
  return response 
}

const signupUser = async (userCredentials) => {
  let response = await fetch(`${BASE_URL}journal/users/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userCredentials)
  })
  return response
}

export default {login, getLoggedInUser, signupUser}



// TOKEN: eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6Im1pa2VzIiwiZXhwIjoxNjA4NTk3ODkyLCJlbWFpbCI6IiJ9.dGcxHu1WHLZPT1aTTR2Jo3Y2AxI3CvCsGU2OJCJDa9E