import Product from "./model/Product.js"
import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()

const app = express()

import dns from "node:dns/promises"
dns.setServers(["1.1.1.1", "8.8.8.8"])

app.use(express.json())

async function ConnectDB() {
    try {
        await mongoose.connect(process.env.MONOGODB_URI)
        console.log("MongoDB Connected")
    } catch (error) {
        console.error("MongoDB Connection Error:", error)
    }
}

ConnectDB()

app.use(
    cors({
        origin: ["http://localhost:5173"],
        methods: ["GET", "POST", "PUT", "DELETE"],
    }),
)

app.get("/products", async (req, res) => {
    try {
        const products = await Product.find()
        res.json(products)
    } catch (error) {
        res.status(500).json({message: "Error fetching products"})
    }
})

app.post("/products", async (req, res) => {
    try {
        const newProductFields = req.body
        const newProduct = new Product(newProductFields)
        await newProduct.save()
        res.status(201).json(newProduct)
    } catch (error) {
        res.status(500).json({message: "Error creating product", error: error})
    }
})

app.put("/products/:id", async (req, res) => {
    try {
    const { id } = req.params
    const updatedProductFields = req.body
    const updatedProduct = await Product.findOneAndUpdate(
        {id},
        updatedProductFields,
        {new: true},
    )
    res.json(updatedProduct)
    } catch (error) {
        res.status(500).json({message: "Error updating product"})
    }
})

app.delete("/products/:id", async (req, res) => {
    try {
    const { id } = req.params
    await Product.findOneAndDelete({id:id})
    res.status(204).send()
    } catch (error) {
        res.status(500).json({message: "Error deleting product"})
    }
})

app.listen(5050, () => {
    console.log("Server is running on PORT 5050")
})