const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const recipes = require('./routes/api/recipes');
const user = require('./routes/api/user');
const app = express();
const path = require('path');
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
app.use('/api/user', user);

//serve static assets if in production
if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port: ${port}`));