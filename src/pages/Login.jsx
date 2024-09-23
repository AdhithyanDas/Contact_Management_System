import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { loginApi } from '../services/allApis'
import { toast } from 'react-toastify'

function Login() {

    const [user, setUser] = useState({
        email: "", password: ""
    })

    const nav = useNavigate()

    const handleLogin = async () => {
        console.log(user);
        const { email, password } = user
        if (!email || !password) {
            toast.warning("Enter Valid Inputs!!")
        } else {
            const result = await loginApi(email, password)
            if (result.status == 200) {
                if (result.data.length > 0) {
                    toast.success("Login Successfull!!")
                    nav('/home')
                    setUser({
                        email: "", password: ""
                    })
                } else {
                    toast.warning("Invalid Email/Password!!")
                }
            } else {
                toast.error("Something Went Wrong!!")
            }
        }
    }

    return (
        <>
            <div className='d-flex justify-content-center container align-items-center p-4' style={{ height: '80vh' }}>
                <div className="shadow bg-light p-5" style={{ width: '80vh' }}>
                    <h1 className='fw-bold text-center'>Log in</h1>
                    <input type="email" onChange={(e) => { setUser({ ...user, email: e.target.value }) }} className='form-control mb-3 mt-3' placeholder='Email address' />
                    <input type="password" onChange={(e) => { setUser({ ...user, password: e.target.value }) }} name='' id='' className='form-control mb-3' placeholder='Password' />
                    <div className='d-flex justify-content-between'>
                        <button className='btn btn-primary w-100 fs-5 fw-bold' onClick={handleLogin} style={{ height: '7vh' }}>Sign in</button>
                    </div>
                    <div className='text-center mt-3'>
                        <Link to={'/register'} className='text-decoration-none text-primary'>Don't have an account?</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login