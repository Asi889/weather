const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const mongoose = require('mongoose')
const path = require('path')


const Expenses = require("./server/model/city")
const apii = require("./server/routes/api")

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/WaetherApp",{ useNewUrlParser: true,useUnifiedTopology: true})

app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.static(path.join(__dirname, 'node_modules')))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/', apii)

const moment = require("moment");




const port= 8500

app.listen(process.env.PORT || 8500, function () {
    console.log(`Server up and running on port ${port}`)
})