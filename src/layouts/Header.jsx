import {useState, useEffect} from 'react'
import useAuth from '../hooks/useAuth'
import { Link,useNavigate } from 'react-router-dom'

const guestNav = [
    { to : '/', text: 'Login'},
    { to : '/register', text: 'Register'},
]

const teacherNav = [
    { to : '/', text: 'Home(T)'},
    { to : '/new', text: 'New Homework'},
]
const studentNav = [
    { to : '/', text: 'Home(S)'},
    { to : '/profile', text: 'Profile'},
]

export default function Header() {
    const {user, logout} = useAuth()
    const navigate = useNavigate()
    const finalNav = !user?.role 
    ? guestNav
    : user.role==='teacher' ? teacherNav : studentNav

    const hdlLogout = () => {
      logout()
      alert('Logout ok')
      navigate('/')
    }
    return (
        <div className="navbar bg-base-100">
            <div className="flex-1">
                <a className="btn btn-ghost text-xl">Hi,{user?.firstname}</a>
                <input type="checkbox" value="dark" className="toggle theme-controller"/>

            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal px-1">
                  { finalNav.map( el => (
                    <li key={el.to}>
                      <Link to={el.to}>{el.text}</Link>
                    </li>
                  ))}
                  { user?.role && (
                    <li>
                    <Link to='#' onClick={hdlLogout}>Logout</Link>
                  </li>
                  )}
                </ul>
            </div>
        </div>
    )
}
