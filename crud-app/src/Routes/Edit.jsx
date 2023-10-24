
import { useNavigate, useParams } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Edit = () => {
    
    const [input, setInput] = useState({
        Name: "",
        Age: "",
        email: "",
    })
    
    const { id } = useParams()
    const fetchsingleData = async () => {
        const { data } = await axios.get(`http://localhost:4002/single-data/${id}`)
        setInput(data.data)
    }
    useEffect(() => {
        fetchsingleData()
    }, [])
    
    
    const navigate = useNavigate()

    const getInput = (e) => {
        // console.log(e.target.value)
        setInput({ ...input, [e.target.Name]: e.target.value })

    }


    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await axios.put("http://localhost:4002/update-data/" + id, input)
            navigate("/")
            setInput({
                Name: "",
                Age: "",
                email: ""
            })
        } catch (error) {
            console.log(error)
        }
    }


    // const Edit = () => {
        return (
            <>
                {/* <div>Edit</div> */}
                <div className='text-center'><h3>Edit</h3></div>
                <form className='row' onSubmit={(e) => handleSubmit(e)}>
                    <div className='col-5 ms-auto me-auto'>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="htmlForm-label"> Full Name</label>
                            <input value={input.Name} name='Name' onChange={(e) => getInput(e)} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="htmlForm-label">Age</label>
                            <input value={input.Age} name='Age' onChange={(e) => getInput(e)} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="htmlForm-label">Email address</label>
                            <input value={input.email} name='email' onChange={(e) => getInput(e)} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                        </div>


                        <button type="submit" className="btn btn-primary">Update</button>
                    </div>
                </form>

            </>
        )
    }

export default Edit