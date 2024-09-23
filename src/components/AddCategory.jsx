import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import CategoryList from './CategoryList';
import { addCategory } from '../services/allApis';
import { toast } from 'react-toastify'

function AddCategory() {

  const [show, setShow] = useState(false);

  const [category, setCategory] = useState({
    categoryName: "", contact: []
  })

  const [addresponse, setAddresponse] = useState("")

  const handleCategory = async () => {
    console.log(category);
    const { categoryName } = category
    if (!categoryName) {
      toast.warning("Enter Valid Inputs!!")
    } else {
      const result = await addCategory(category)
      console.log(result);
      if (result.status == 201) {
        toast.success("Category Added!!")
        handleClose()
        setCategory({
          categoryName: "", contact: []
        })
        setAddresponse(result)
      } else {
        toast.error("Adding Faild!!")
      }
    }
  }

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div className='d-grid container-fluid mt-4'>
        <button className='btn btn-primary fw-bold' onClick={handleShow}>Add Category
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
          <Modal.Title className='fw-bold'>Add Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FloatingLabel controlId="" label="Category Name" className='mb-3' onChange={(e) => { setCategory({ ...category, categoryName: e.target.value }) }}>
            <Form.Control type="text" placeholder="" />
          </FloatingLabel>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCategory}>Add</Button>
        </Modal.Footer>
      </Modal>

      <CategoryList response={addresponse} />
    </>
  )
}

export default AddCategory