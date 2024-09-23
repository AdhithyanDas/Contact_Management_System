import React from 'react'
import Container from 'react-bootstrap/Container';
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
                <Container>
                    <Navbar.Brand href="#home" className='text-white ms-3 fw-bold'>
                        <i className="fa-solid fa-address-book" style={{ color: "#fcfcfd", }} />
                        {' '}
                        Contacts
                    </Navbar.Brand>
                </Container>
                <button className='btn text-white me-5 border border-white border-3' onClick={logout}>LogOut</button>
            </Navbar>
        </>
    )
}

export default Header