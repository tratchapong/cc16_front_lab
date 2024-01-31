import React from 'react'
import {RouterProvider, createBrowserRouter, Outlet, Navigate} from 'react-router-dom'
import LoginForm from '../layouts/LoginForm'
import RegisterForm from '../layouts/RegisterForm'
import Header from '../layouts/Header'
import useAuth from '../hooks/useAuth'
import HomeworkForm from '../layouts/HomeworkForm'
import TeacherHome from '../layouts/TeacherHome'

const routerGuest = createBrowserRouter([
    {
        path : '/',
        element : <>
            <Header />
            <Outlet />
            </>,
        errorElement: <Navigate to='/' />,
        children : [
            { index: true, element: <LoginForm /> },
            // { path: '/login', element: <LoginForm /> },
            { path: '/register', element: <RegisterForm /> },
        ]
    }
])

const routerTeacher = createBrowserRouter([
    {
        path : '/',
        element : <>
            <Header />
            <Outlet />
        </>,
        errorElement: <Navigate to='/' />,
        children: [
            { index: true, element: <TeacherHome /> },
            { path: '/new', element: <HomeworkForm /> },
        ]
    }
])
const routerStudent = createBrowserRouter([
    {
        path : '/',
        element : <>
            <Header />
            <Outlet />
        </>,
        errorElement: <Navigate to='/' />,
        children: [
            { index: true, element: <p>StudentHome</p> },
            { path: '/profile', element: <p>Show Profile</p> },
        ]
    }
])


export default function AppRouter() {
  const {user} = useAuth()
  const finalRouter = !user?.role 
    ? routerGuest
    : user.role==='teacher' ? routerTeacher : routerStudent
  return (
    <RouterProvider router={finalRouter}/>
  )
}
