var express = require('express');
var router = express.Router();
var Article = require('../models/articles');
var Comment = require('../models/comments');

/* GET users listing. */
router.get('/', (req, res) => {
  Article.find({}, (err,articles) => {
    if(err) {
      console.log(err)
    } else{
      res.render('articles', {articles:articles});
    }
  })
});

router.get('/new',(req,res) => {
  res.render('newArticle.ejs');
})

router.post('/',(req,res) => {
  Article.create(req.body, (err,article) => {
    if(err){
      console.log(err)
    } else{
      res.redirect('articles')
    }
  })
})

router.get('/:id',(req,res) => {
  var id = req.params.id;
  Article.findById(id,(err,article) => {
    if(err) {
      console.log(err)
    } else{
      res.render('singleArticle',{article:article})
    }
  })
})

router.get('/:id/edit',(req,res) => {
  var id = req.params.id;
  Article.findById(id, (err,article) => {
    if(err) {
      console.log(err)
    } else{
      res.redirect('updateArticle', {article:article})
    }
  })
})

router.post('/:id', (req,res) => {
  var id = req.params.id;
  Article.findByIdAndUpdate(id,req.body,(err,article) => {
    if(err){
      console.log(err)
    } else{
      res.redirect('/articles/' + id);
    }
  })
})
router.get('/:id/delete', (req,res,next) => {
  var id = req.params.id;
  Article.findByIdAndDelete(id,(err,article) => {
    if(err) return next(err)
    res.redirect('/articles.ejs');
  })
})

router.post('/:id/comments', (req,res,next) => {
  var id = req.params.id;
  req.body.bookId  = id;
  Comment.create(req.body, (err,comment) => {
    if(err) return next(err)
    Comment.findByIdAndUpdate(id, {comments: {$push:comment._id}}, (err,updatedBook) => {
      if(err) return next(err);
      res.redirect('/articles/' + id);
    })
    
  })
})

router.get('/:id',(req,res,next) => {
  var id = req.params.id;
  Book.findById(id).populate('comments').exec((err,article) => {
    if(err) return next(err)
    res.render('singleArticle',{article});
  })
})

router.get('/comments/:id/edit', (req,res,next) => {
  var id = req.params.id;
  
})

module.exports = router;
