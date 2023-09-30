import { useState } from 'react'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { userService } from '../services/user.service.js'
import { login, logout, signup } from '../store/actions/user.actions.js'
import { useSelector } from 'react-redux'

function getEmptyCredentials() {
  return {
    fullname: '',
    username: '',
    password: '',
  }
}

export function LoginSignup() {
  const [credentials, setCredentials] = useState(getEmptyCredentials())
  const [isSignupState, setIsSignupState] = useState(false)
  const loggedinUser = useSelector((state) => state.userModule.loggedinUser)

  function handleCredentialsChange(ev) {
    const field = ev.target.name
    const value = ev.target.value
    setCredentials((credentials) => ({ ...credentials, [field]: value }))
  }
  async function onSubmit(ev) {
    ev.preventDefault()

    try {
      let user

      if (isSignupState) {
        user = await signup(credentials)
        showSuccessMsg(`Welcome ${user.fullname}`)
      } else {
        user = await login(credentials)
        showSuccessMsg(`Hi again ${user.fullname}`)
      }
    } catch (err) {
      if (isSignupState) {
        showErrorMsg('Cannot signup')
      } else {
        showErrorMsg('Cannot login')
      }
    }
  }

  function onToggleSignupState() {
    setIsSignupState((isSignupState) => !isSignupState)
  }

  function onLogout() {
    logout()

    setIsLoggedIn(false)
  }

  const { username, password, fullname } = credentials

  if (loggedinUser) {
    return (
      <div>
        welcome back! {loggedinUser.fullname}
        <button className='logout-btn' onClick={logout}>
          logout
        </button>
      </div>
    )
  }

  return (
    <div className='login-page'>
      <form className='login-form' onSubmit={onSubmit}>
        <input type='text' name='username' value={username} placeholder='Username' onChange={handleCredentialsChange} required autoFocus />

        <input type='password' name='password' value={password} placeholder='Password' onChange={handleCredentialsChange} required />

        {isSignupState && (
          <input type='text' name='fullname' value={fullname} placeholder='Full name' onChange={handleCredentialsChange} required />
        )}

        <button>{isSignupState ? 'Signup' : 'Login'}</button>
      </form>

      <div className='btns'>
        <a href='#' onClick={onToggleSignupState}>
          {isSignupState ? 'Already a member? Login' : 'New user? Signup here'}
        </a>
      </div>
    </div>
  )
}
