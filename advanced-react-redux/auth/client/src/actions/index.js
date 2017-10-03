import axios from 'axios'
import { browserHistory } from 'react-router'
import { AUTH_USER, UNAUTH_USER, AUTH_ERROR, FETCH_MESSAGE } from './types'

const ROOT_URL = 'http://localhost:3090'

export function signinUser({ email, password }, redirect) {
  return function(dispatch) {
    // Submit email/password to the server
    axios.post(`${ROOT_URL}/signin`, { email, password })
      .then(response => {
        // If request is good...
        // - Update state to indicate user is authenticated
        dispatch({ type: AUTH_USER })
        // - Save the JWT token
        localStorage.setItem('token', response.data.token)
        // - Redirect to route '/feature'
        redirect()
      })
      .catch(error => {
        console.log('Error signing in')
        console.log(error.response)
        // If request is bad...
        // - Show an error to the user
        dispatch(authError('Bad Login Info'))
      })
  }
}

export function signupUser(email, password, redirect) {
  return function(dispatch) {
    // Submit email/password to the server
    axios.post(`${ROOT_URL}/signup`, { email, password })
      .then(response => {
        dispatch({ type: AUTH_USER })
        localStorage.setItem('token', response.data.token)
        redirect()
      })
      .catch(error => {
        console.log('Error signing up')
        console.log(error.response)
        const responseBody = error.response.data
        dispatch(authError(responseBody.error))
      })
  }
}

// error parameter is string to show user
export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error,
  }
}

export function signoutUser() {
  localStorage.removeItem('token')

  return { type: UNAUTH_USER }
}

export function fetchMessage() {
  return function(dispatch) {
    const token = localStorage.getItem('token')
    axios.get(ROOT_URL, {
      headers: { authorization: token }
    })
      .then(response => {
        dispatch({
          type: FETCH_MESSAGE,
          payload: response.data.message
        })
      })
      .catch(error => {
        console.log(`Error accessing protected resource at ${ROOT_URL}`)
        console.log(error.response)
      })
  }
}
