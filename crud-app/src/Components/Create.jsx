import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Create = () => {
    const [input, setinput] = useState({
        name: "",
        email: "",
        age: ""

    })

    const navigate = useNavigate()

    const getinput = (e) => {
        console.log(e.target.value)
        setinput({ ...input, [e.target.name]: e.target.value })
    }

    const onhandlesubmit = async (e) => {
        e.preventDefault()
        console.log(input)
        try {
            await axios.post("http://localhost:4002/post-data", input)
            navigate("/")
            setinput({
                Name: "",
                Age: "",
                email: "",
            })
        }
        catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <div className='text-center' ><h1>Create</h1></div>
            <form className='row' onSubmit={(e) => onhandlesubmit(e)}>
                <div className='col-5 ms-auto me-auto'>
                    <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Full Name</label>
                        <input value={input.Name} name='Name' onChange={(e) => getinput(e)} type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Age</label>
                        <input value={input.Age} name='Age' onChange={(e) => getinput(e)} type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Email Address</label>
                        <input value={input.email} name='email' onChange={(e) => getinput(e)} type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    </div>
                    <button type="submit" class="btn btn-primary">Submit</button>
                </div>
            </form>

        </>
    )
}

export default Create