//file defining the routes for the recipe api
const express = require('express');
const router = express.Router();
const Recipe = require('../../models/Recipe');
const validateRecipe = require('../../validation/recipes');

var admin = require('firebase-admin');
var serviceAccount = require('../../config/mealme-9fb07-firebase-adminsdk-hev5f-6726b0810b.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://mealme-9fb07.firebaseio.com'
});

// @route   POST api/recipes/test
// @desc    Tests recipe route
// @access  Public
router.post('/test', (req, res) => {
    token = req.body.token;

    admin.auth().verifyIdToken(token).then(decoded => {
        var uid = decoded.uid;
        return res.json({uid: uid});
    }).catch(err => {
        return res.status(400).json({error: 'error verifying token'});
    });

});

// @route   POST api/recipes/recipe
// @desc    Posts a recipe to the db
// @access  Public
router.post('/recipe', (req, res) => {
    const {errors, isValid } = validateRecipe(req.body);
    if(!isValid){
        return res.status(400).json(errors);
    }
    token = req.body.token;
    if(token === undefined || token === ""){
        return res.status(400).json({error: 'firebase token required'});
    }
    admin.auth().verifyIdToken(token).then(decoded => {
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
        newRecipe.save().then(response => res.json({success: "success"})).catch(err => res.status(400).json({errors: err}))
    }).catch(err => {
        return res.status(400).json({error: 'error verifying token'});
    });


});

module.exports = router;