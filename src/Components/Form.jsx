import axios from 'axios'
import React from 'react'
import { inputValues } from '../inputValues'

export default function Form() {

    async function addData(e) {
        e.preventDefault()

        // simple validation
        const productName = document.getElementById("productName").value
        const productPrice = document.getElementById("productPrice").value
        const productDescription = document.getElementById("productDescription").value

        if (productName === "" || productDescription === "" || productPrice === 0) {
            alert("Please enter all fields!")
        } else {
            const data = inputValues()
            try {
                await axios.post("http://localhost:5000/addProduct", data)
            } catch (error) {
                console.log(error);
            }
        }
        
    }


    return (
        <div>
            <div className='pt-3 pb-3'>
                <h1 className='text-center'>CRUD APP</h1>
            </div>

            <div className="container">
                <form id='form'>
                    <div className="form-group mb-3">
                        <label className='form-label'>Product Name</label>
                        <input type="text" className='form-control' id='productName' required />
                    </div>

                    <div className="form-group mb-3">
                        <label className='form-label'>Product Price</label>
                        <input type="text" className='form-control' id='productPrice' required />
                    </div>

                    <div className="form-group mb-3">
                        <label className='form-label'>Product Description</label>
                        <textarea className='form-control' cols={4} rows={3} id='productDescription' required />
                    </div>

                    <button type='submit' className='btn btn-primary' id='addButton' onClick={addData}>Add Product</button>
                    <button type='submit' className='btn btn-primary d-none' id='updateButton'>Update Product</button>
                </form>
            </div>
        </div>
    )
}
