// import express from "express"
const express = require('express')
require('dotenv').config()
const route = require('./router/router')
const cors = require('cors')
const app = express()
const PORT = process.env.PORT || 4002

app.use(express.json())
app.use(cors())
app.use(route)
// app.use(express.static("../crud-app/build"))


// app.get("/", (req, res) =>
//     res.send("<h1>Hello World</h1>")
// })

// app.get("/about", (req, res) => {
//     res.send("<h1>This is about page</h1>")
// })

// app.get("/contact", (req, res) => {
//     res.send("<h1>This is contact page</h1>")
// })


console.log(process.env)

app.listen(PORT, () => {
    console.log(`server is running... at http://localhost:${PORT}`)
})