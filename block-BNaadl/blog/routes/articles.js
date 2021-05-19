var express = require('express');
var router = express.Router();
var Article = require('../models/articles');

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
  Article.create(req.body, (err,data) => {
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
      res.redirect('updatedArticle', {article:article})
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





module.exports = router;
