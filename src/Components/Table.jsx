import React, { useEffect, useState } from 'react'
import TableItem from './TableItem'
import axios from 'axios'

function Table() {

    const [products, setProduct] = useState([])

    async function getData() {
        const response = await axios.get("http://localhost:5000/products")
        setProduct(response.data)
    }

    useEffect(() => {
        getData()
    }, [products])


    return (
        <div className="mt-4">
            <table className="container table text-center">
                <thead className='tableHeader'>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody id="tbody">
                    {
                        products && products.map((product) => {
                            return <TableItem data={product} key={product.id} />
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Table
