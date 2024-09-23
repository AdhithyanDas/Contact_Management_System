import axios from "axios";

const base_Url = "https://contact-server-5oqz.onrender.com"

export const checkEmailApi = async (email) => {
    return await axios.get(`${base_Url}/users?email=${email}`)
}

export const registerApi = async (data) => {
    return await axios.post(`${base_Url}/users`, data)
}

export const loginApi = async (email, password) => {
    return await axios.get(`${base_Url}/users?email=${email}&password=${password}`)
}

export const addContact = async (data) => {
    return await axios.post(`${base_Url}/contacts`, data)
}

export const getContact = async () => {
    return await axios.get(`${base_Url}/contacts`)
}

export const deleteContact = async (id) => {
    return await axios.delete(`${base_Url}/contacts/${id}`)
}

export const updateContact = async (id, data) => {
    return await axios.put(`${base_Url}/contacts/${id}`, data)
}

export const addCategory = async (data) => {
    return await axios.post(`${base_Url}/category`, data)
}

export const getCategories = async () => {
    return await axios.get(`${base_Url}/category`)
}

export const deleteCategory = async (id) => {
    return await axios.delete(`${base_Url}/category/${id}`)
}

export const updateCategory = async (id, data) => {
    return await axios.put(`${base_Url}/category/${id}`, data)
}