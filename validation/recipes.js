const isEmpty = require('./is-empty');

module.exports = function validateRecipe(data){
    let errors = {};
    if(isEmpty(data.name)){
        errors.name = "recipe name is required"
    }
    if(data.ingredients === undefined || data.ingredients.length === 0){
        errors.ingredients = "ingredients must be listed"
    }
    if(data.directions === undefined || data.directions.length === 0){
        errors.directions = "directions must be listed"
    }
    return {
        errors: errors,
        isValid: isEmpty(errors)
    };


};