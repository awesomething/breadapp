const express = require('express')
const app = express()
const methodOverride = require('method-override')
const mongoose = require('mongoose')
// CONFIGURATION
require('dotenv').config()

app.get('/', (req,res) =>{
    res.send('Welcome to an Awesome Bread App')
})


// MIDDLEWARE
app.set('views', __dirname + '/views')
app.set('view engine', 'jsx')
app.engine('jsx', require('express-react-views').createEngine())
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'))


//BREADS
const breadsController = require('./controllers/breads_controller')
app.use('/breads', breadsController)

//BAKERS
const bakersController = require('./controllers/bakers_controller')
app.use('/bakers', bakersController)

const PORT = process.env.PORT || 5000
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true},
    () => {console.log('connected to : ', process.env.MONGO_URI)}
    )
// 404 Page
app.get('*', (req, res) => {
    res.send('404')
  })

app.listen(process.env.PORT)
// app.listen(PORT, () =>{
//     console.log('LISTENING ON SERVER', PORT)
// })
