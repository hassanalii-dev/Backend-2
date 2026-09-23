import express from "express"

const app = express()

app.use(express.json())

let products = [
    {
        id: 1,
        name: "Gaming PC",
        price: 50000,
        imageurl: "gaming-pc.jpg",
        desc: "A powerful gaming PC"
    },
    {
        id: 2,
        name: "Gaming Keyboard",
        price: 5000,
        imageurl: "gaming-keyboard.jpg",
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

app.delete("/products/:id", (req, res) => {
    const { id } = req.params

    products = products.filter((product) => product.id !== parseInt(id))

    res.status(204).send()
})

app.listen(5050, () => {
    console.log("Server is running on PORT 5050")
})
