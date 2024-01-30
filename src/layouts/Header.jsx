import {useState, useEffect} from 'react'
import useAuth from '../hooks/useAuth'
import { Link } from 'react-router-dom'

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
    const {user} = useAuth()
    // const [finalNav, setFinalNav] = useState([])

    // useEffect( ()=>{
    //   setFinalNav( !user?.role 
    //     ? guestNav 
    //     : user?.role === 'teacher' 
    //       ? teacherNav : studentNav
    //   )
    // }, [user?.role] )

    const finalNav = !user?.role 
    ? guestNav
    : user.role==='teacher' ? teacherNav : studentNav
    
    return (
        <div className="navbar bg-base-100">
            <div className="flex-1">
                <a className="btn btn-ghost text-xl">Super HW</a>
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal px-1">
                  { finalNav.map( el => (
                    <li key={el.to}>
                      <Link to={el.to}>{el.text}</Link>
                    </li>
                  ))}

                </ul>
            </div>
        </div>
    )
}
