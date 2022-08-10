const express = require('express')
const router = express.Router()

const Note = require('../models/Note')

router.get('/notes/add', (req, res) => {
 res.render('notes/new-note')
})

router.post('/notes/new-note', async (req, res) => {
 console.log(req.body)
 const { title, description } = req.body

 const errors = []
 if (!title) {
  errors.push({ textToShowInError: 'Please write a Title' })
 }
 if (!description) {
  errors.push({ textToShowInError: 'please write a description' })
 }
 if (errors.length > 0) {
  res.render('notes/new-note', {
   errors,
   title,
   description
  })
 } else {
  const newNote = new Note({
   title,
   description
  })
  console.log(newNote)
  await newNote.save()
  res.redirect('/notes')
 }
}
)

router.get('/notes', async (req, res) => {

 const notes = await Note.find()

 res.render()

})




module.exports = router