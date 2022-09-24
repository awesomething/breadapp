const express = require('express')
const app = express()

// CONFIGURATION
require('dotenv').config()
const PORT = process.env.PORT
console.log(PORT)

app.get('/', (req,res) =>{
    res.send('Welcome to an Awesome Bread App')
})

//BREADS
const breadsController = require('./controllers/breads_controller')
app.use('/breads', breadsController)

app.listen(PORT, () =>{
    console.log('LISTENING ON SERVER', PORT)
})
