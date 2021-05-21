var express = require('express');
var router = express.Router();
var Article = require('../models/articles');
var Comment = require('../models/comments');

router.get('/:id/edit',(req,res,next) => {
    var id = req.params.id;
    Comment.findById(id, (err,comment) => {
        if(err) return next (err)
        res.render('updateComment.ejs', {comment});
    })
})

router.post('/:id', (req,res,next) => {
    var id = req.params.id;
    Comment.findByIdAndUpdate(id,req.body,(err,updatedComment) => {
        res.redirect('/articles/' + updatedComment.articleId);
    })
})

router.post('/:id/delete', (req,res) => {
    var commentId = req.params.id;
    Comment.findByIdAndRemove(commentId,(err,comment) => {
        if (err) return next(err)
        res.redirect('/articles/' + comment.articleId);
    })
})