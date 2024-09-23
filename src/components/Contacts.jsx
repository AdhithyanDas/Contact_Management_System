import React, { useState, useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import ContactsCard from './ContactsCard'
import { getContact, deleteContact } from '../services/allApis';
import { toast } from 'react-toastify'

function Contacts({ add }) {

    const [contactList, setContactList] = useState([])

    const [editResponse, setEditResponse] = useState('')

    useEffect(() => {
        getData()
    }, [add, editResponse],)

    const getData = async () => {
        const result = await getContact()
        console.log(result);
        if (result.status == 200) {
            setContactList(result.data)
        } else {
            console.log(result);
        }
    }

    const delContact = async (id) => {
        const result = await deleteContact(id)
        console.log(result);
        if (result.status == 200) {
            toast.success("Contact Deleted!!")
            getData()
        }
    }

    return (
        <>
            <div className='shadow mt-3 p-4 mx-4' style={{ maxWidth: '130vh' }}>
                {
                    contactList.length > 0 ?
                        <Row>
                            <h2 className='text-primary fw-bold'>All Contacts</h2>
                            {
                                contactList.map(item => (

                                    <Col sm={12} md={4}>
                                        <ContactsCard contact={item} del={delContact} edit={setEditResponse} />
                                    </Col>
                                ))
                            }
                        </Row>
                        :
                        <h2 className='text-center text-primary fw-bold'>No Contacts Added!!</h2>
                }
            </div>
        </>
    )
}

export default Contacts