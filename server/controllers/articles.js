const Article = require('../models/articles')
const User = require('../models/users')
const methods = {}

methods.insertOne = function(req, res){
	let user_id = req.decoded._id;
  Article.create({
    title : req.body.title,
    content : req.body.content,
		category : req.body.category,
		author : user_id
	}, function(error, record){
    if(error){
      res.json({error})
    } else {
      res.json(record)
    }
  })
}

methods.getAll = function(req, res){
	Article.find({})
		.populate('author')
		.exec((error, records) => {
		  if(error){
		    res.json({error})
		  } else {
		    res.json(records)
		  }
		})
}

methods.getById = function(req, res){
  Article.find({_id : req.params.id })
	.populate('author')
	.exec((error, records) => {
    if(error){
      res.json({error})
    } else {
			res.json(records);
    }
  })
}

methods.updateById = function(req, res){
  Article.findByIdAndUpdate(req.params.id,
		{ $set: {
			title : req.body.title,
			content : req.body.content,
			category : req.body.category
		}
		},
		{new: true})
		.populate('author')
  	.exec((error, record) => {
    if(error){
      res.json({error})
    } else {
      res.json(record)
    }
  })
}

methods.deleteById = function(req, res){
  Article.findByIdAndRemove(req.params.id)
  .exec((error, record) => {
    if(error){
      res.json({error})
    } else {
      res.json(record)
    }
  })
}

module.exports = methods
