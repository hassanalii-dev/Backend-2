import express from "express"

const app = express()

app.use(express.json())

let products = [
    {
        id: 1,
        name: "Gaming PC",
        price: 50000,
        imageurl: "https://th.bing.com/th/id/OIP.zSox3lDLqSkiL3S2rU3kHgHaEQ?r=0&o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3",
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

app.delete("/products/:id", (req, res) => {
    const { id } = req.params

    products = products.filter((product) => product.id !== parseInt(id))

    res.status(204).send()
})

app.listen(5050, () => {
    console.log("Server is running on PORT 5050")
})