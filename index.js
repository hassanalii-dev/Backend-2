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

let products = [
    {
        id: 1,
        name: "Gaming PC",
        price: 50000,
        imageurl: "https://tse1.mm.bing.net/th/id/OIP.zSox3lDLqSkiL3S2rU3kHgHaEQ?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
        desc: "A powerful gaming PC"
    },
    {
        id: 2,
        name: "Gaming Keyboard",
        price: 5000,
        imageurl: "https://www.howtogeek.com/wp-content/uploads/2022/04/rgb-lit-gaming-mechanical-keyboard.jpg?width=1198&trim=1,1&bg-color=000&pad=1,1",
        desc: "A mechanical gaming keyboard"
    }
]

app.get("/products", (req, res) => {
    res.json(products)
})

app.post("/products", (req, res) => {
    const newProduct = req.body

    products.push(newProduct)

    res.status(201).json(newProduct)
})

app.put("/products/:id", (req, res) => {
    const { id } = req.params
    const updatedProduct = req.body

    const index = products.findIndex(
        (product) => product.id === parseInt(id)
    )

    if (index !== -1) {
        products[index] = {
            ...products[index],
            ...updatedProduct
        }

        res.json(products[index])
    } else {
        res.status(404).json({
            message: "Product not found"
        })
    }
})

app.delete("/products/:id", (req, res) => {
    const { id } = req.params

    products = products.filter(
        (product) => product.id !== parseInt(id)
    )

    res.status(204).send()
})

app.listen(5050, () => {
    console.log("Server is running on PORT 5050")
})