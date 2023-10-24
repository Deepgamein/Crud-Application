import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Logout = () => {

    const navigate = useNavigate()
    const logout = () => {
        localStorage.removeItem("token")
        navigate("/login")
    }

    useEffect(() => {
        logout()
    },[])
   
  return (
    <></>
  )
}

export default Logout