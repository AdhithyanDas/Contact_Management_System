import React, { useState } from 'react'
import AddContact from '../components/AddContact'
import Contacts from '../components/Contacts'
import AddCategory from '../components/AddCategory'
import { Row, Col } from 'react-bootstrap'

function Home() {

  const [addResponse, setAddResponse] = useState("")

  return (
    <>
      <AddContact response={setAddResponse} />

      <div className='container-fluid'>
        <Row>
          <Col sm={12} md={8}>
            <Contacts add={addResponse} />
          </Col>
          <Col sm={12} md={4}>
            <AddCategory />
          </Col>
        </Row>
      </div>
    </>
  )
}

export default Home