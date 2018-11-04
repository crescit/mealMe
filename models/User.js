const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    uid: {
        type: String,
        required: true
    },
    recipes: [
        {
            recipeid: {
                type: String,
                required: true
            }
        }
    ],
    shopList: [
        {
            item: {
                type: String,
                required: true
            }
        }
    ]
});

module.exports = User = mongoose.model('user', UserSchema);