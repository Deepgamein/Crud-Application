import React, { useEffect, useState } from 'react'
import axios from 'axios'
import "./LoginPage/login.css"

import Create from './Create'
import { NavLink, useNavigate } from 'react-router-dom'


const Home = () => {
    const [apidData, setapiData] = useState()
    const navigate = useNavigate()
    const [show, setShow] = useState(false)

    let token = localStorage.getItem("token")

    const fun = () => {
        navigate('/create')
    }
    const fetchdata = async () => {
        // const { data } = await axios.get("https://649ffa56ed3c41bdd7a6e225.mockapi.io/Deep")
        const { data } = await axios.get("http://localhost:4002/get-data")
        // console.log(data)
        setapiData(data)
    }
    // console.log(apidData);

    useEffect(() => {
        fetchdata();
    }, [])


    const edit = (id) => {
        // console.log(id)
        navigate(`/edit/${id}`);
    }

    const deleteData = async (id) =>{
        // alert id
        const check = window.confirm("Do you want to delete ?")
        if (check) {
            await axios.delete(`http://localhost:4002/delete-data/${id}`)

            fetchdata()
        }
    }

    const checkUserAuth =async () =>{
        try {
            const { data } = await axios.get("",{
                headers: {
                    "Content-Type":"application/login",
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })

            if (data.status === 200){
                navigate("/")
            }
        } catch (error) {
            if([401, 403].includes(error.response.status)) {
                navigate("/")
            }  
        }
    }
    const Auth = () =>{
        if(!token) {
            navigate("/")
        } else {
            setShow(true)
            checkUserAuth()
        }
    }

    useEffect(() => {
        Auth()
    },[])




    return (
        <>


            {show && (<div>

            <h1 className='text-center'>CRUD APP</h1>
            <button className='btn btn-info' onClick={fun}>Create</button>
            <button style={{marginLeft:"10px"}} className="btn btn-danger"><NavLink style={{textDecoration:"none",color:"white", float:"right"}} to={"/logout"}>Logout</NavLink></button>
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Age</th>
                        <th scope="col">Email</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        apidData?.map((data, index) => {
                            return (
                                <>
                                    <tr key={index}>
                                        <th>{data.id}</th>
                                        <td>{data.Name}</td>
                                        <td>{data.Age}</td>
                                        <td>{data.email}</td>
                                        <td><button className='btn btn-primary' onClick={() => edit(data.id)}>Edit</button></td>
                                        <td><button className='btn btn-danger' onClick={()=> deleteData(data.id)}>Delete</button></td>
                                    </tr>
                                </>
                            )
                        })
                    }
                </tbody>
            </table >
            </div>)}
        </>

    )
}

export default Home