const express = require('express')
const mongoose = require('mongoose')
const Book = require('./models/Book.model')

const app = express()
app.use(express.json())

app.get('/api/books', async (request, response) => {
  try {
    const books = await Book.find()

    response.json(books)
  } catch (error) {
    console.log(error)
  }
})

app.get('/api/books/:bookId', async (request, response) => {
  const { bookId } = request.params

  if (mongoose.isValidObjectId(bookId)) {
    try {
      const book = await Book.findById(bookId)

      response.json(book)
    } catch (error) {
      console.log(error)
      response.status(400).json({ error, message: 'There was a problem' })
    }
  } else {
    response.status(400).json({ message: 'Invalid Id' })
  }
})

app.post('/api/books', async (request, response) => {
  console.log(request.body)
  try {
    const newBook = await Book.create(request.body)

    response.status(201).json(newBook)
  } catch (error) {
    console.log(error)
    response.status(500).json(error)
  }
})

app.put('/api/books/:bookId', async (request, response) => {
  const { bookId } = request.params

  console.log(request.body)
  try {
    const updatedBook = await Book.findByIdAndUpdate(bookId, request.body, {
      new: true,
      runValidators: true,
    })

    response.json(updatedBook)
  } catch (error) {
    console.log(error)
    response.status(500).json(error)
  }
})

app.delete('/api/books/:bookId', async (request, response) => {
  const { bookId } = request.params

  if (mongoose.isValidObjectId(bookId)) {
    try {
      await Book.findByIdAndDelete(bookId)

      response.status(204).send()
    } catch (error) {
      console.log(error)
      response.status(400).json({ error, message: 'There was a problem' })
    }
  } else {
    response.status(400).json({ message: 'Invalid Id' })
  }
})

mongoose
  .connect('mongodb://127.0.0.1:27017/mongooseIntro')
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)

    app.listen(4000, () => {
      console.log('Server running on http://localhost:4000')
    })
  })
  .catch(err => console.error('Error connecting to mongo', err))
