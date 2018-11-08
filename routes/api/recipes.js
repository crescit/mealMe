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
// @desc    Tests recipe route authentication
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

// @route   GET api/recipes/random
// @desc    gets 3 random recipes
// @access  Public
router.get('/random', (req, res) => {

    Recipe.count().exec(function (err, count) {

        // Get a random entry
        var random = Math.floor(Math.random() * count);

        Recipe.findOne().skip(random).exec(
            function (err, result) {
                return res.json(result);
            })
    })
});

// @route   GET api/recipes/:term
// @desc    gets all recipes with a specific term in the name
// @access  Public
router.get('/:name' , (req, res) => {
    const name = req.params.name.replace(/_/g, ' ');
    Recipe.find({name: new RegExp(name, 'i')}).then(items => {
        return res.json(items);
    }).catch(
        error => {
            return res.status(404).json({error: 'recipe not found'})
        }
    );
});
// @route   GET api/recipes/ingredients/:term
// @desc    gets all recipes with a specific term in the ingredients
// @access  Public
router.get('/ingredients/:term' , (req, res) => {
    const term = req.params.term.replace(/_/g, ' ');

    Recipe.find({ingredients: new RegExp(term, 'i')}).then(items => {
        return res.json(items);
    }).catch(
        error => {
            return res.status(404).json({error: 'recipe not found'})
        }
    );

});


// @route   GET api/recipes/all
// @desc    gets all recipes
// @access  Public
router.get('/recipe/all' , (req, res) => {
    Recipe.find({}).then(items => {
        return res.json(items);
    }).catch(
        error => {
            return res.status(404).json({error: 'recipe not found'})
        }
    );

});
// @route   GET api/recipes/find/:id
// @desc    gets recipe by a specific id
// @access  Public
router.get('/findbyid/:id' , (req, res) => {
    const id = req.params.id;
    Recipe.find({_id: id}).then(items => {
        return res.json(items);
    }).catch(
        error => {
            return res.status(404).json({error: 'recipe not found'})
        }
    );

});
// @route   DELETE api/recipes/:id
// @desc    deletes recipe by a specific id
// @access  Public
router.delete('/:id' , (req, res) => {
    const id = req.params.id;
    Recipe.findOneAndDelete({_id: id}).then(() => {
        Recipe.findOneAndDelete({_id: id}).then(() => res.json({success: true}));
    }).catch(
        error => {
            return res.status(404).json({error: 'recipe not found'})
        }
    );

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
        newRecipe.save().then(response => res.json({response})).catch(err => res.status(400).json({errors: err}))
    }).catch(err => {
        return res.status(400).json({error: 'error verifying token'});
    });


});

module.exports = router;