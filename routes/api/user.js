//file defining the routes for the user api
const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const validateUser = require('../../validation/user');
var admin = require('firebase-admin');

// @route   GET api/user/test
// @desc    Tests user route
// @access  Public
router.get('/test', (req,res) => {
    return res.json({success: "success"});
});

// @route   POST api/user/getshoplist
// @desc    gets users shopping list
// @access  PRIVATE
router.post('/getshoplist', (req, res) => {
    token = req.body.token;
    if(token === undefined || token === ""){
        return res.status(400).json({error: 'firebase token required'});
    }
    admin.auth().verifyIdToken(token).then(decoded => {
        var uid = decoded.uid;

        User.findOne({uid: uid}).then(userres => {

            if(userres) {
                return res.json(userres.shopList);
            }else{
                return res.status(404).json({error: "user not found"})
            }
        });
    }).catch(err => {
        return res.status(400).json({error: 'error verifying token'});
    });

});
// @route   POST api/user/getrecipes
// @desc    gets users recipes
// @access  PRIVATE
router.post('/getrecipes', (req, res) => {
    token = req.body.token;
    if(token === undefined || token === ""){
        return res.status(400).json({error: 'firebase token required'});
    }
    admin.auth().verifyIdToken(token).then(decoded => {
        var uid = decoded.uid;

        User.findOne({uid: uid}).then(userres => {

            if(userres) {
                return res.json(userres.recipes);
            }else{
                return res.status(404).json({error: "user not found"})
            }
        });
    }).catch(err => {
        return res.status(400).json({error: 'error verifying token'});
    });

});
// @route   POST api/user/getuser
// @desc    gets the user object from database
// @access  PRIVATE
router.post('/getuser', (req, res) => {
    token = req.body.token;
    if(token === undefined || token === ""){
        return res.status(400).json({error: 'firebase token required'});
    }
    admin.auth().verifyIdToken(token).then(decoded => {
        var uid = decoded.uid;

        User.findOne({uid: uid}).then(userres => {

            if(userres) {
                return res.json(userres);
            }else{
                return res.status(404).json({error: "user not found"})
            }
        });
    }).catch(err => {
        return res.status(400).json({error: 'error verifying token'});
    });

});



// @route   POST api/user/test
// @desc    Tests user route authentication
// @access  Public
router.post('/test', (req, res) => {
    token = req.body.token;
    if(token === undefined || token === ""){
        return res.status(400).json({error: 'firebase token required'});
    }
    admin.auth().verifyIdToken(token).then(decoded => {
        var uid = decoded.uid;
        return res.json({uid: uid});
    }).catch(err => {
        return res.status(400).json({error: 'error verifying token'});
    });

});

// @route   POST api/user/
// @desc    creates new user on the database
// @access  PRIVATE
router.post('/', (req, res) => {
    token = req.body.token;
    if(token === undefined || token === ""){
        return res.status(400).json({error: 'firebase token required'});
    }
    const user = {};
    admin.auth().verifyIdToken(token).then(decoded => {
        var uid = decoded.uid;
        var name = decoded.name;

        user.name = name;
        user.uid = uid;


        const {errors, isValid} = validateUser(user);
        if(!isValid){
            return res.status(400).json(errors);
        }
        User.findOne({uid: user.uid}).then(userres => {

            if(userres) {
                return res.status(400).json({error: "user already exists"});
            }else{

                const newUser = new User({
                    name: user.name,
                    uid: user.uid
                });
                newUser.save().then(
                    res.json(newUser)
                ).catch(err => res.status(400).json({errors: err}));

            }
        });

    }).catch(err => {
        return res.status(400).json({error: 'error verifying token'});
    });

});

// @route   POST api/user/recipes/:recipeid
// @desc    saves a recipe to the user
// @access  PRIVATE
router.post('/recipes/:recipeid', (req, res) => {
    token = req.body.token;
    if(token === undefined || token === ""){
        return res.status(400).json({error: 'firebase token required'});
    }
    admin.auth().verifyIdToken(token).then(decoded => {
        var uid = decoded.uid;

        User.findOne({uid: uid}).then(user => {
            if(user) {
                const recipe = {
                    recipeid: req.params.recipeid
                };
                user.recipes.unshift(recipe);
                user.save().then(user => res.json(user));
            }else{
                return res.status(400).json({error: "user not found"});
            }
        })
    }).catch(err => {
        return res.status(400).json({error: 'error verifying token'});
    });


});

// @route   POST api/user/shoplist
// @desc    saves an item to a users shopping list
// @access  PRIVATE
router.post('/shoplist', (req, res) => {
    token = req.body.token;
    if(token === undefined || token === ""){
        return res.status(400).json({error: 'firebase token required'});
    }
    if(req.body.item === undefined){
        return res.status(400).json({error: 'item is required'});
    }
    admin.auth().verifyIdToken(token).then(decoded => {
        var uid = decoded.uid;

        User.findOne({uid: uid}).then(user => {
            if(user) {
                const item = {
                    item: req.body.item
                };
                user.shopList.unshift(item);
                user.save().then(user => res.json(user));
            }else{
                return res.status(400).json({error: "user not found"});
            }
        })
    }).catch(err => {
        return res.status(400).json({error: 'error verifying token'});
    });
});

// @route   DELETE api/user/recipes/:recipeid/:token
// @desc    deletes a recipe with a specified _id from a user
// @access  PRIVATE
router.delete('/recipes/:recipe_id/:token', (req, res) => {
    token = req.params.token;
    if (token === undefined || token === "") {
        return res.status(400).json({error: 'firebase token required'});
    }
    admin.auth().verifyIdToken(token).then(decoded => {
        var uid = decoded.uid;

        User.findOne({uid: uid}).then(user => {
            if (user) {
                const removeIndex = user.recipes.map(item => item._id.toString()).indexOf(req.params.recipe_id.toString());

                if(removeIndex === -1){
                    return res.status(404).json({error: "recipe not found"});
                }
                user.recipes.splice(removeIndex, 1);
                user.save().then(user => res.json(user));

            } else {
                return res.status(400).json({error: "user not found"});
            }
        })
    }).catch(err => {
        return res.status(400).json({error: 'error verifying token'});
    });

});


// @route   DELETE api/user/shoplist/:item_id
// @desc    deletes a recipe with a specified _id from a user
// @access  PRIVATE
router.delete('/shoplist/:item_id/:token', (req, res) => {
    token = req.params.token;
    if (token === undefined || token === "") {
        return res.status(400).json({error: 'firebase token required'});
    }
    admin.auth().verifyIdToken(token).then(decoded => {
        var uid = decoded.uid;

        User.findOne({uid: uid}).then(user => {
            if (user) {
                const removeIndex = user.shopList.map(item => item._id.toString()).indexOf(req.params.item_id);

                if(removeIndex === -1){
                    return res.status(404).json({error: "item not found"});
                }
                user.shopList.splice(removeIndex, 1);
                user.save().then(user => res.json(user));

            } else {
                return res.status(400).json({error: "user not found"});
            }
        })
    }).catch(err => {
        return res.status(400).json({error: 'error verifying token'});
    });
});
module.exports = router;