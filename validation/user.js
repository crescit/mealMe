const isEmpty = require('./is-empty');

module.exports = function validateRecipe(data){
    let errors = {};
    if(isEmpty(data.name)){
        errors.name = "user name is required"
    }
    if(isEmpty(data.uid)){
        errors.uid = "user id provided by firebase is required"
    }

    return {
        errors: errors,
        isValid: isEmpty(errors)
    };


};