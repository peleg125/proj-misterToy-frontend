import { Link, NavLink } from 'react-router-dom'
import { LoginSignup } from './LoginSignup'

export function AppHeader() {
  return (
    <header className='app-header'>
      <Link className='logo' to='/'>
        <h2>Mister Toys</h2>
      </Link>
      <nav className='nav-links'>
        <NavLink to='/'>Home</NavLink>
        <NavLink to='/about'>About</NavLink>
        <NavLink to='/toy'>Toys</NavLink>
        <NavLink to='/dashboard'>Dashboard</NavLink>
      </nav>
      <LoginSignup />
    </header>
  )
}
