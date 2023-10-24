import React, { useState } from 'react'
import "./login.css"
import "../Assets/person.png"

import user_icon from "../Assets/person.png"
import email_icon from "../Assets/email.png"
import password_icon from "../Assets/password.png"
import axios from 'axios'
import { NavLink, Navigate, useNavigate } from 'react-router-dom'

const Login = () => {

    const[input, setInput] = useState();
    const navigate = useNavigate()
    const getInput = (e) =>{
        console.log(e.target.name)
        console.log(e.target.value)
        setInput({...input, [e.target.name]: e.target.value})
    }

    const onhandlesubmit =async (e) =>{
        e.preventDefault()
        console.log(input)
        try {
            const {data} =await axios.post("http://localhost:4002/sign-up", input)
            console.log(data)
            if(data.status === 201){
                navigate("/login")
            }
        } catch (error) {
            alert(error.response)
        }

    }

  return (
    <form onSubmit={(e) => onhandlesubmit(e)}>
      <div className='container'>
        <div className="header">
            <div className="text">Sign Up</div>
            <div className="underline"></div>
        </div>
        <div className="inputs">
            <div className="input">
                <img src={user_icon} alt="" />
                <input name='Name' type="text" placeholder='Name' onChange={(e) => getInput(e)}/>
            </div>

            <div className="input">
                <img src={email_icon} alt="" />
                <input name="email" type="email" placeholder='Email Id' onChange={(e) => getInput(e)}/>
            </div>
            <div className="input">
                <img src={password_icon} alt="" />
                <input name='Password' type="password" placeholder='Password' onChange={(e) => getInput(e)}/>
            </div>

        </div>

        <div className="submit-container">
        <button type='submit' className='submit'>Sign Up</button>
        <NavLink to={"/login"} style={{float:"right"}}>Login</NavLink>
        </div>
    </div>
    </form >
  )
}

export default Login