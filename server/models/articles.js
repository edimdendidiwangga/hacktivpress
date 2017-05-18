const mongoose = require('mongoose')
const Schema = mongoose.Schema

let articleSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  content: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
	author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  created: {
    type: Date,
    default: Date.now
  }
})

let Article = mongoose.model('Article', articleSchema)

module.exports = Article
