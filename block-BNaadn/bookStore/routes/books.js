var express = require('express');
var router = express.Router();
var Book = require('../models/book')
var Author = require('../models/author')

/* GET users listing. */
router.get('/author/:id',(req,res,next) => {
    var id = req.params.id;
    Author.findById(id).populate('books').exec((err,author) => {
        
    })

})


router.get('/new', (req,res) => {
    res.render('addBook.ejs');
})

router.post('/', (req,res,next) => {
Book.create(req.body,(err,book) => {
    if(err) return next(err)
    res.redirect('/books.ejs');
})
})

router.get('/:id/edit',(req,res,next) => {
    var id = req.params.id;
    Book.findById(id,(err,book) => {
        if(err) return next(err)
        res.render('updateBook.ejs',{book});
    })
})

router.post('/:id',(req,res,next) => {
    var id = req.params.id;
    Book.findByIdAndUpdate(id,req.body,(err,updatedBook) => {
        if(err) return next(err)
        res.redirect('/books/' + id)
    })
})

router.get('/:id/delete',(req,res,next) => {
    var id = req.params.id;
    Book.findByIdAndDelete(id,(err,book) => {
        if(err) return next(err)
        res.redirect('/books.ejs');
    })
})





module.exports = router;

