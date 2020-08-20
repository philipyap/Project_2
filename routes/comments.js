let express = require('express')
let db = require('../models')
let router = express.Router()

// how we getting this routes
// 1. /comments because we are using comments.js routes and thats the action of server
// 2. /cookbook because its the action in the post routes
// 3. what the total action looks like url:
//    localhost:8000/comments/cookbook 
router.post('/cookbook', (req, res)=>{
    db.comment.create({
        content: req.body.content,
        userId: req.user.id,
        recipeId: req.body.recipeId
    })
    .then(()=>{
        res.redirect('/cookbook')
    })
    .catch(err=>{
        console.log('error', err)
    })
})

module.exports = router