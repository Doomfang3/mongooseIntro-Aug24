const mongoose = require('mongoose')

// CREATE SCHEMA
// Schema - describes and enforces the structure of the documents
const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  author: {
    type: String,
    required: true,
    trim: true,
  },
  difficulty: {
    type: String,
    enum: ['Easy Peasy', 'Alright', 'Yeah Nah'],
    default: 'Easy Peasy',
  },
})

// CREATE MODEL
// The model() method defines a model (Book) and creates a collection (books) in MongoDB
// The collection name will default to the lowercased, plural form of the model name:
//                          "Book" --> "books"
const Book = mongoose.model('Book', bookSchema)

// EXPORT THE MODEL
module.exports = Book
// export default Book
