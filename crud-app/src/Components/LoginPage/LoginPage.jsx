
import React, { useState } from 'react'
import "./login.css"
import "../Assets/person.png"

import user_icon from "../Assets/person.png"
import email_icon from "../Assets/email.png"
import password_icon from "../Assets/password.png"
import axios from 'axios'
import { NavLink, Navigate, useNavigate } from 'react-router-dom'


const LoginPage = () => {

    const[input, setInput] = useState();
    const navigate =useNavigate()
    const getInput = (e) =>{
        // console.log(e.target.name)
        // console.log(e.target.value)
        setInput({...input, [e.target.name]: e.target.value})
    }

    const onhandlesubmit =async (e) =>{
        e.preventDefault()
        // console.log(input)
        try {
            const {data} =await axios.post("http://localhost:4002/login", input)
            console.log(data.token)
            
            if(data.status === 200){
                localStorage.setItem("token",data.token)
                navigate("/")
            }
            if(data.status === 400){
                alert(data.message)
            }
        } catch (error) {
            alert(error.response.message)
        }

    }

  return (
    <form onSubmit={(e) => onhandlesubmit(e)}>
      <div className='container'>
        <div className="header">
            <div className="text">Login</div>
            <div className="underline"></div>
        </div>
        <div className="inputs">
            {/* <div className="input">
                <img src={user_icon} alt="" />
                <input name='Name' type="text" placeholder='Name' onChange={(e) => getInput(e)}/>
            </div> */}

            <div className="input">
                <img src={email_icon} alt="" />
                <input name="email" type="email" placeholder='Email Id' onChange={(e) => getInput(e)}/>
            </div>
            <div className="input">
                <img src={password_icon} alt="" />
                <input name='Password' type="password" placeholder='Password' onChange={(e) => getInput(e)}/>
            </div>
        </div>
        <div className="forgot-pass">Forget Password? <span>Click here</span></div>
        <div className="submit-container">
        <button type='submit' className='submit'>Login</button>
        
        <button2 className='submit'>
        <NavLink className='n' to={"/signup"} style={{float:"right"}}>Sign Up</NavLink>
        </button2>
        </div>
    </div>
    </form >
  )
}

export default LoginPage