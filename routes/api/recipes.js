//file defining the routes for the recipe api
const express = require('express');
const router = express.Router();
const Recipe = require('../../models/Recipe');
const validateRecipe = require('../../validation/recipes');
// @route   GET api/recipes/test
// @desc    Tests recipe route
// @access  Public
router.get('/test', (req, res) => {
    return res.json({success: "success"});
});

//TODO: Change this route to private
// @route   POST api/recipes
// @desc    Posts a recipe to the db
// @access  Public
router.post('/recipe', (req, res) => {
    const {errors, isValid } = validateRecipe(req.body);
    if(!isValid){
        return res.status(400).json(errors);
    }
    const newRecipe = new Recipe({
        name: req.body.name,
        img: req.body.img,
        level: req.body.level,
        prep: req.body.prep,
        cook: req.body.cook,
        yield: req.body.yield,
        ingredients: req.body.ingredients,
        directions: req.body.directions
    });
    newRecipe.save().then(res => res.json({success: "success"})).catch(err => res.status(400).json({errors: err}))
});

module.exports = router;