const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const recipes = require('./routes/api/recipes');


const app = express();

const db = require('./config/keys').mongoURI;
//Body Parser Middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Connect to mongodb
mongoose
    .connect(db, { useNewUrlParser: true })
    .then( () => console.log('MongoDb Connected'))
    .catch( err => console.log(err));

app.use('/api/recipes', recipes);
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port: ${port}`));