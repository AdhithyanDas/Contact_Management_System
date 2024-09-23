import React, { useState, useEffect } from 'react'
import { getCategories, deleteCategory, updateCategory } from '../services/allApis';
import { toast } from 'react-toastify'
import ContactsCard from './ContactsCard';

function CategoryList({ response }) {

  const [categoryList, setCategoryList] = useState([])

  useEffect(() => {
    getData()
  }, [response])

  const getData = async () => {
    const result = await getCategories()
    console.log(result);
    if (result.status == 200) {
      setCategoryList(result.data)
    }
  }

  const deleteCat = async (id) => {
    const result = await deleteCategory(id)
    console.log(result);
    if (result.status == 200) {
      toast.success("Category Removed!!")
      getData()
    }
  }

  const dropHandler = async (e, category) => {
    console.log('Dropped');
    const conta = JSON.parse(e.dataTransfer.getData("contact"));
    category.contact.push(conta)
    const result = await updateCategory(category.id, category)
    console.log(result);
    if (result.status == 200) {
      toast.success(`${conta.name} added to ${category.categoryName}`)
      getData()
    } else {
      toast.error("Contact-Category adding Faild!!")
    }
  }

  const dragOverHandler = (e) => {
    console.log("Dragging");
    e.preventDefault()
  }

  return (
    <>
      <div className="container-fluid px-5 py-4 mt-3 shadow mb-5">

        {
          categoryList.length > 0 ?
            <div>
              {
                categoryList.map(item => (
                  <div className='border border-black rounded-3 mb-3 border-3 pb-5'>
                    <div className='m-2 p-3 mb-3 d-flex justify-content-between' onDragOver={(e) => { dragOverHandler(e) }} onDrop={(e) => { dropHandler(e, item) }}>
                      <h3 className='fw-bold text-success'>{item.categoryName}</h3>
                      <button className='btn' onClick={() => { deleteCat(item.id) }}>
                        <i className="fa-solid fa-trash-can text-primary" />
                      </button>
                    </div>
                    <div>
                      {
                        item?.contact?.length > 0 &&
                        <>
                          {
                            item?.contact?.map(conta => (
                              <ContactsCard contact={conta} cat={true} />
                            ))
                          }
                        </>
                      }
                    </div>
                  </div>
                ))
              }
            </div>
            :
            <h5 className='text-center text-primary fw-bold'>No Categories!!</h5>
        }

      </div>
    </>
  )
}

export default CategoryList