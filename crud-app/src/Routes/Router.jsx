import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from '../Components/Home'
import Create from '../Components/Create'
import Edit from './Edit'
import Task from '../Components/Task'
import Login from '../Components/LoginPage/login'
import LoginPage from '../Components/LoginPage/LoginPage'
import Logout from '../Components/LoginPage/Logout'



const Router = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    {/* <Route path="/" element={<Home />} /> */}
                    <Route path='/create' element={<Create />} />
                    <Route path='/edit/:id' element={<Edit />} />
                    {/* <Route path='/edit/:id' element={<Task />} /> */}

                    <Route path='/signup' element={<Login />} />
                    <Route path='/login' element={<LoginPage/>}/>
                    <Route path='/logout' element={<Logout/>}/>

                </Routes>
            </BrowserRouter>
        </>

    )
}

export default Router