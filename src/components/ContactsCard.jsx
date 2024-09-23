import React, { useState } from 'react'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { updateContact } from '../services/allApis';
import { toast } from 'react-toastify'

function ContactsCard({ contact, del, cat, edit }) {

    const [show, setShow] = useState(false);

    const [contactDetails, setContactDetails] = useState(contact)

    const handleUpdate = async () => {
        const result = await updateContact(contactDetails.id, contactDetails)
        if (result.status == 200) {
            toast.success("Contact Updated Successfull!!")
            edit(result)
            handleClose()
        }
    }

    const dragHandler = (e) => {
        console.log(e);
        console.log(contact);
        e.dataTransfer.setData("contact", JSON.stringify(contact))
    }

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <div style={cat ? { display: 'flex', justifyContent: 'center' } : { textAlign: 'center' }}>
                <Card style={cat ? { width: '70%', height: '15vh', flexWrap: 'wrap' } : { maxWidth: '38vh', minHeight: '30vh' }} onDragStart={(e) => { dragHandler(e) }} draggable className='border border-3 border-black mt-3 rounded-3 p-2 border-opacity-50 text-danger'>
                    <div className='mt-1' style={cat ? { paddingTop: '10px', display: 'flex', justifyContent: 'center' } : {}}>
                        <Card.Img variant="top" style={cat ? { height: '7vh', width: '7vh', borderRadius: '100vh' } : { borderRadius: '100vh', height: '11vh', width: '11vh' }} src={contact?.imageUrl} alt="" />
                    </div>
                    <Card.Body>
                        <Card.Title className='fw-bold'>{contact?.name}</Card.Title>
                        <Card.Text>
                            {contact?.mobile}
                        </Card.Text>
                        {
                            !cat &&
                            <div className='d-flex justify-content-around'>
                                <button className='btn' onClick={handleShow}>
                                    <i className="fa-solid fa-pen-to-square" style={{ color: 'navy' }} />
                                </button>
                                <button className='btn' onClick={() => { del(contact?.id) }}>
                                    <i className="fa-solid fa-trash-can text-primary" />
                                </button>
                            </div>
                        }
                    </Card.Body>
                </Card>
            </div>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title className='fw-bold'>Edit Contact</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FloatingLabel controlId="" label="Name" className="mb-3" >
                        <Form.Control type="text" placeholder="" Value={contact?.name} onChange={(e) => setContactDetails({ ...contactDetails, name: e.target.value })} />
                    </FloatingLabel>

                    <FloatingLabel controlId="" label="Mobile Number" className='mb-3' >
                        <Form.Control type="number" placeholder="" Value={contact?.mobile} onChange={(e) => setContactDetails({ ...contactDetails, mobile: e.target.value })} />
                    </FloatingLabel>

                    <FloatingLabel controlId="" label="Image URL" className='mb-3' >
                        <Form.Control type="text" placeholder="" Value={contact?.imageUrl} onChange={(e) => setContactDetails({ ...contactDetails, imageUrl: e.target.value })} />
                    </FloatingLabel>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleUpdate}>Update</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ContactsCard