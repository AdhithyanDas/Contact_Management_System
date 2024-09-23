import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify'
import { addContact } from '../services/allApis';

function AddContact({ response }) {

    const [show, setShow] = useState(false);

    const [contact, setContact] = useState({
        name: "", mobile: "", imageUrl: ""
    })

    const handleContact = async () => {
        console.log(contact);
        const { name, mobile, imageUrl } = contact
        if (!name || !mobile || !imageUrl) {
            toast.warning("Enter Valid Inputs!!")
        } else {
            const result = await addContact(contact)
            console.log(result);
            if (result.status == 201) {
                toast.success("Contact Added!!")
                handleClose()
                response(result)
                setContact({
                    name: "", mobile: "", imageUrl: ""
                })
            } else {
                toast.error("Contact Adding Faild!!")
            }
        }
    }

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <div className='mt-5 ms-5'>
                <button className='btn btn-primary fw-bold pe-1' onClick={handleShow}>Add Contact
                    <i className="fa-solid fa-plus p-2" />
                </button>
            </div>


            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title className='fw-bold'>Add Contact</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FloatingLabel controlId="" label="Name" className="mb-3" onChange={(e) => { setContact({ ...contact, name: e.target.value }) }}>
                        <Form.Control type="text" placeholder="" />
                    </FloatingLabel>

                    <FloatingLabel controlId="" label="Mobile Number" className='mb-3' onChange={(e) => { setContact({ ...contact, mobile: e.target.value }) }}>
                        <Form.Control type="number" placeholder="" />
                    </FloatingLabel>

                    <FloatingLabel controlId="" label="Image URL" className='mb-3' onChange={(e) => { setContact({ ...contact, imageUrl: e.target.value }) }}>
                        <Form.Control type="text" placeholder="" />
                    </FloatingLabel>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleContact}>Add</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default AddContact