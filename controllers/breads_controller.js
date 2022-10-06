const express = require('express')
const breads = express.Router()
const Bread = require('../models/bread')


breads.get('/', (req,res) =>{
  Bread.find()
  .then(foundBreads => {
    res.render('index',
    {
        breads: foundBreads,
        title: 'Index Page'
    }
    )
  })
})

//BEFORE Mongoose Connect
// breads.get('/', (req,res) =>{
//   // res.render('Index',
//   // {
//   //     breads: Bread,
//   //     title: 'Index Page'
//   // }
//   // )
//   //res.send(Bread)
// })

// NEW
breads.get('/new', (req, res) => {
    res.render('new')
})

//EDIT
breads.get('/:id/edit', (req,res) => {
  Bread.findById(req.params.id)
  .then(foundBread =>{
    res.render('edit', {
      bread: foundBread
    })
  })
  
})


//EDIT B4 mongoose
// breads.get('/:indexArray/edit', (req,res) => {
//   res.render('edit', {
//     bread: Bread[req.params.indexArray],
//     index: req.params.indexArray,
//   })
// })

//SHOW
breads.get('/:id', (req,res) =>{
  Bread.findById(req.params.id)
  .then(foundBread => {
    res.render('show', {
      bread: foundBread
    })
  }).catch( err =>{ res.send('404') })
})

//SHOW -B4 Mongoose
// breads.get('/:arrayIndex', (req,res) =>{
//     if(Bread[req.params.arrayIndex]) {
//     res.render('Show', {
//         bread: Bread[req.params.arrayIndex],
//         index: req.params.arrayIndex,
//     })
//     }else {
//         res.render('Error')
//     }
// })

//DELETE
breads.delete('/:id', (req,res)=>{
  Bread.findByIdAndDelete(req.params.id)
  .then(deletedBread =>{
    res.status(303).redirect('/breads')
  })
})

//DELETE -B4 Mongoose
// breads.delete('/:indexArray', (req,res) =>{
//   Bread.splice(req.params.indexArray, 1)
//   res.status(303).redirect('/breads')
// })

breads.put('/:id', (req,res) =>{
  if(req.body.hasGluten === 'on'){
    req.body.hasGluten = true
  } else {
    req.body.hasGluten = false
  }
  Bread.findByIdAndUpdate(req.params.id, req.body, { new: true })
  .then(updatedBread=>{
    console.log(updatedBread)
    res.redirect(`/breads/${req.params.id}`)
  })
})

//UPDATE b4 mongoose
// breads.put('/:arrayIndex', (req,res) =>{
//   if(req.body.hasGluten === 'on'){
//     req.body.hasGluten = true
//   } else {
//     req.body.hasGluten = false
//   }
//   Bread[req.params.arrayIndex] = req.body
//   res.redirect(`/breads/${req.params.arrayIndex}`)
// })

//CREATE
breads.post('/', (req, res) => {
    if (!req.body.image) {
      req.body.image = undefined
    }
    if(req.body.hasGluten === 'on') {
      req.body.hasGluten = true
    } else {
      req.body.hasGluten = false
    }
    Bread.create(req.body)
    res.redirect('/breads')
  })
  

module.exports = breads