//file defining the schema for the recipe
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RecipeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    img: {
        type: String
    },
    level: {
        type: String
    },
    total: {
        type: String
    },
    prep: {
        type: String
    },
    cook: {
        type: String
    },
    yield: {
        type: String
    },
    ingredients: [
        {
            type: String,
            required: true
        }
    ],
    directions: [
        {
            type: String,
            required: true
        }
    ]
});

module.exports = Recipe = mongoose.model('recipe', RecipeSchema);