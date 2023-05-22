import React from 'react'
import { Navigate, Outlet} from 'react-router-dom'
const Private = () => {
    const authering = localStorage.getItem('user')
  return authering? <Outlet />:<Navigate  to='/SignIn' />
}

export default Private