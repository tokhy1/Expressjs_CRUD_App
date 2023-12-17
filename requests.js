const express = require('express')
const mysql = require("mysql2")
const app = express()

// to make the api allow the requests from the front-end.
const cors = require("cors")
app.use(cors())

app.use(express.json())

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "test"
})


// GET Request
app.get("/products", (req, res) => {
    const query = "SELECT * FROM products"
    db.execute(query, (error, data) => {
        if (error) {
            res.send(error)
        } else {
            res.send(data)
        }
    })
})

// get specific product
app.get("/products/:id", (req, res) => {
    const productId = req.params.id
    const query = "SELECT * FROM products WHERE id = ?"
    db.execute(query, [productId], (error, data) => {
        if (error) {
            res.send(error)
        } else if (data.affectedRows == 0) {
            res.send("product not found")
        } else {
            res.send(data)
        }
    })
})

// POST Request
app.post("/addProduct", (req, res) => {
    const data = req.body
    const query = "INSERT INTO `products`(`name`, `price`, `description`) VALUES (?, ?, ?)"
    db.execute(query, [data.name, data.price, data.description], (error, data) => {
        if (error) {
            res.send(error)
        } else {
            res.send("A new product Added successfully")
        }
    })
})

// UPDATE Request
app.put("/updateProduct/:id", (req, res) => {
    const productId = +req.params.id
    let data = req.body
    const query = "UPDATE `products` SET `name`= ?,`price`= ?, `description` = ? WHERE id = ?"
    db.execute(query, [data.name, data.price, data.description, productId], (error, data) => {
        if (error) {
            res.send(error)
        } else if (data.affectedRows == 0) {
            res.send("product not found")
        } else {
            res.send("product Updated Successfully")
        }
    })
})

// DELETE Request
app.delete("/deleteProduct/:id", (req, res) => {
    const productId = +req.params.id
    const query = "DELETE FROM `products` WHERE id = ?"
    db.execute(query, [productId], (error, data) => {
        if (error) {
            res.send(error)
        } else if (data.affectedRows == 0) {
            res.send("product not found")
        } else {
            res.send("product deleted")
        }
    })
})

app.listen(5000, () => {
    console.log("server is running at http://localhost:5000");
})
