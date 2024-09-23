import React from 'react'
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Header() {

    const nav = useNavigate()

    const logout = () => {
        toast.success("LogOut Successfull!!")
        nav('/')
        sessionStorage.removeItem('userData')
    }

    return (
        <>
            <Navbar className="bg-primary border-0" style={{ minHeight: '10vh' }}>
                    <Navbar.Brand href="#home" className='text-white ms-3 fw-bold'>
                        <i className="fa-solid fa-address-book ms-5" style={{ color: "#fcfcfd", }} />
                        {' '}
                        Contacts
                    </Navbar.Brand>
                <button className='btn text-white me-5 border border-white border-3 ms-auto' onClick={logout}>LogOut</button>
            </Navbar>
        </>
    )
}

export default Header