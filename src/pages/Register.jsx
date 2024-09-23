import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { checkEmailApi, registerApi } from '../services/allApis'
import { toast } from 'react-toastify'

function Register() {

    const [user, setUser] = useState({
        email: "", username: "", password: ""
    })

    const nav = useNavigate()

    const handleRegister = async () => {
        console.log(user);
        const { email, username, password } = user
        if (!email || !username || !password) {
            toast.warning("Enter Valid Inputs!!")
        } else {
            const result = await checkEmailApi(email)
            console.log(result);
            if (result.data.length > 0) {
                toast.warning("Email address already in use!!")
            } else {
                const result = await registerApi(user)
                if (result.status == 201) {
                    toast.success("Registration Successfull!!")
                    setUser({
                        email: "", username: "", password: ""
                    })
                    nav('/')
                } else {
                    toast.error("Registration Failed!!")
                    console.log(result);
                }
            }
        }
    }

    return (
        <>
            <div className='d-flex justify-content-center align-items-center p-4' style={{ height: '80vh' }}>
                <div className="shadow bg-light p-5" style={{ width: '80vh' }}>
                    <h1 className='fw-bold text-center'>Register</h1>
                    <input type="email" className='form-control mb-3 mt-3' onChange={(e) => { setUser({ ...user, email: e.target.value }) }} placeholder='Email address' />
                    <input type="text" className='form-control mb-3' onChange={(e) => { setUser({ ...user, username: e.target.value }) }} placeholder='Username' />
                    <input type="password" name='' id='' className='form-control mb-3' onChange={(e) => { setUser({ ...user, password: e.target.value }) }} placeholder='Password' />
                    <div className='d-flex justify-content-between'>
                        <button className='btn btn-primary w-100 fs-5 fw-bold' onClick={handleRegister} style={{ height: '7vh' }}>Sign Up</button>
                    </div>
                    <div className='text-center mt-3'>
                        <Link to={'/'} className='text-decoration-none text-primary'>Have an account?</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Register