import React from 'react';
import axios from 'axios';

export default function TableItem({ data }) {

    async function deleteProduct(id) {
        try {
            await axios.delete(`http://localhost:5000/deleteProduct/${id}`);
        } catch (error) {
            console.log(error);
        }
    }

    function updateProduct(id) {
        let addButton = document.getElementById("addButton");
        addButton.classList.add("d-none");

        let updateButton = document.getElementById("updateButton");
        updateButton.classList.remove("d-none");

        updateButton.onclick = async function (e) {
            e.preventDefault();
            try {
                // Use the state values instead of direct DOM manipulation
                await axios.put(`http://localhost:5000/updateProduct/${id}`, {
                    name: document.getElementById("productName").value,
                    price: document.getElementById("productPrice").value,
                    description: document.getElementById("productDescription").value
                });
            } catch (error) {
                console.log(error);
            }
        };
    }

    return (
        <tr>
            <td>{data.name}</td>
            <td>{data.price}</td>
            <td>{data.description}</td>
            <td>
                <button className='btn btn-success' id='updateItem' onClick={() => updateProduct(data.id)}>
                    Update
                </button>
                <button className='btn btn-danger' id='deleteItem' onClick={() => deleteProduct(data.id)}>
                    Delete
                </button>
            </td>
        </tr>
    );
}
