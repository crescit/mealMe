"use strict";
var path = require('path');
var root = path.dirname(require.main.filename);
var axios = require('axios');
var filePath = root + "/data.json";

var fs = require("fs");

var content = fs.readFileSync(filePath);

var jsonContent = JSON.parse(content);


var arr = JSON.parse(JSON.stringify(jsonContent));

for(var i = 610; i < arr.length; i++){
  const body = {
      name: arr[i].name,
      img: arr[i].img,
      level: arr[i].level,
      total: arr[i].total,
      prep: arr[i].prep,
      cook: arr[i].cook,
      yield: arr[i].yield,
      ingredients: arr[i].ingredients,
      directions: arr[i].directions
  }
  axios.post('http://localhost:5000/api/recipes/recipe', body).then(res => console.log(`${i} recipe posted`)).catch(err => {console.log(`failed at ${i} + ${err.response.data}`); } );
}
