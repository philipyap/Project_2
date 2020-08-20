const express = require('express');
const router = express.Router();
const db = require('../models');
const axios = require('axios');
let searchUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?';

router.get('/results', (req, res)=>{
    console.log('this is my search query: ', req.query.s)
    let search = req.query.s 
    axios.get(searchUrl + 's=' + search ) 
    .then((response)=> { 
        console.log(response.data.meals)
        let recipes = response.data.meals
        res.render('results', {recipes})
    })
    .catch(err=>{
        console.log('error', err)
    })
})
//fave
router.post('/', (req, res)=>{
    console.log(req.body.title)
    let data = req.body
    db.recipe.create({
        title: data.title,
        userId: req.user.id,
        instruction: data.instruction,
        ingredient: data.ingredient,
        measure: data.measure,
        imgUrl: data.imgUrl
    })
    .then((fave, created)=>{
        console.log(`this is created: ${created}`)
        res.redirect('/cookbook')
    })
    .catch(err=>{
        console.log('error', err)
        res.render('error')
    })
})


router.delete('/cookbook/:id', (req, res)=>{
 db.recipe.destroy({
        where: {id: req.params.id},
        //include: [db.comment, db.user]
    })
    .then(()=>{
        db.comment.destroy({
            where: {recipeId: req.params.id}
            
        })
        .then((destroyRecipes) => {
            res.redirect('/cookbook')
        })
        .catch(err=>{
            res.send('error', err)
            })
    })
    .catch(err=>{
        res.send('error', err)
    })
  
})

module.exports = router;